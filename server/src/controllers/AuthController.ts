import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { UserType } from '../models/UserModel';
import User from '../models/UserModel';
import AppError from '../utils/appError';
import env from '../utils/validateEnv';

export default class AuthController {
   /**
    *  Compare passwords while login
    *  @param {string} candidatePwd
    *  @param {string} userPwd
    *  @returns {boolean} BCrypt compared value
    */
   private correctPassword = async function (candidatePwd: string, userPwd: string): Promise<boolean> {
      return await bcrypt.compare(candidatePwd, userPwd);
   };

   /**
    * Check if the password changed wile user logged in
    * @param this
    * @param JWTTimestamp
    * @returns {boolean}
    */
   private changedPassword = async function (this: UserType, JWTTimestamp: number): Promise<boolean> {
      if (this.passwordChangedAt) {
         const changedTimeStamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
         return JWTTimestamp < changedTimeStamp;
      }
      return false;
   };

   /**
    * Sign the json web token
    * @param id
    * @returns {string} jwt signed string
    */
   private signToken = (id: string): string => {
      return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
   };

   /**
    * Send the signed token to the browser via cookie
    * @param {UserType }user
    * @param {number} statusCode
    * @param {Request} req
    * @param {Response} res
    */
   public createAndSendToken = async (user: UserType, statusCode: number, req: Request, res: Response) => {
      const token = this.signToken(user._id);

      const cookieOptions = {
         expires: new Date(Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
         httpOnly: true,
         secure: req.secure || req.headers['x-forwarded-proto'] === 'https' || req.hostname === 'localhost',
      };

      res.cookie('jwt', token, cookieOptions);

      // Remove password from output
      user.password = undefined;

      res.status(statusCode).json({
         status: 'success',
         token,
         data: {
            user,
         },
      });
   };

   /**
    *  Register function
    */
   public signUp = catchAsync(async (req: Request, res: Response) => {
      const newUser: UserType = await User.create(req.body);
      res.status(201).json({
         status: 'success',
         data: newUser,
      });
   });

   /**
    * Login fuinction
    * @param email
    * @param password
    */
   public login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) return next(new AppError('Please provide email and password', 400));

      const user: UserType | null = await User.findOne({ email }).select('+password');

      if (!user) return next(new AppError('No user found with this email.', 404));

      if (!(await this.correctPassword(password, user.password))) return next(new AppError('Incorrect password', 401));

      await this.createAndSendToken(user, 200, req, res);
   });

   public protected = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // Get the token and check if it exists
      let token;

      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.jwt) {
         token = req.cookies.jwt;
      }

      if (!token) {
         return next(new AppError('You are not logged in! Please log in to get access.', 401));
      }

      // Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET) as UserType;

      // Check if the current user still exists
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
         return next(new AppError('The user belonging to this token does no longer exist.', 401));
      }

      if (await this.changedPassword.call(currentUser, decoded.iat)) {
         return next(new AppError('User recently changed password! Please log in again.', 401));
      }

      // Grant access to protected route
      req.user = currentUser;
      res.locals.user = currentUser;
      next();
   });

   public logout = (_req: Request, res: Response) => {
      res.cookie('jwt', 'loggedout', {
         expires: new Date(Date.now() + 10 * 1000),
         httpOnly: true,
      });
      res.status(200).json({ status: 'success' });
   };
}
