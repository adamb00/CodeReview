import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import catchAsync from '../utils/catchAsync';
import { UserType } from '../models/UserModel';
import User from '../models/UserModel';
import AppError from '../utils/appError';
import env from '../utils/validateEnv';
import IUser from '../interfaces/IUser';
import Email from '../utils/email';

interface Decoded {
   id: string;
   iat: number;
   exp: number;
}

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
      return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '1d' });
   };

   /**
    * Send the signed token to the browser via cookie
    * @param {UserType }user
    * @param {number} statusCode
    * @param {Request} req
    * @param {Response} res
    */
   private createAndSendToken = async (user: UserType, statusCode: number, _req: Request, res: Response) => {
      const token = this.signToken(user._id);

      res.cookie('jwt', token, {
         expires: new Date(Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
         httpOnly: false,
         sameSite: 'none',
         // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
         secure: true,
      });
      // Remove password from output
      user.password = undefined;

      res.status(statusCode).json({
         status: 'success',
         token,
         data: user,
      });
   };

   /**
    * Creates to token to reset the password for not logged users
    * @param user
    * @returns
    */
   private createPasswordResetToken = (user: IUser) => {
      const resetToken = crypto.randomBytes(32).toString('hex');

      user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000;

      return resetToken;
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

      const user: UserType | null = await User.findOne({ email }).select(['+password', '+active']);
      console.log(user);

      if (!user) return next(new AppError('No user found with this email.', 404));

      if (!(await this.correctPassword(password, user.password))) return next(new AppError('Incorrect password', 401));

      await this.createAndSendToken(user, 200, req, res);
   });

   /**
    * Protect routes from not logged users
    */
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
      const decoded: Decoded = jwt.verify(token, env.JWT_SECRET) as Decoded;

      // Check if the current user still exists
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
         return next(new AppError('The user belonging to this token does no longer exist.', 401));
      }

      if (await this.changedPassword(decoded.iat)) {
         return next(new AppError('User recently changed password! Please log in again.', 401));
      }

      // Grant access to protected route
      req.user = currentUser;
      res.locals.user = currentUser;
      next();
   });

   public isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
      if (req.cookies.jwt) {
         try {
            const decoded: Decoded = jwt.verify(req.cookies.jwt, env.JWT_SECRET) as Decoded;
            const currentUser = await User.findById(decoded.id);

            if (!currentUser) return next();

            if (await this.changedPassword(decoded.iat)) return next();

            res.locals.user = currentUser;
            return next();
         } catch (err) {
            console.log(err);
            return next();
         }
      }
      next();
   };

   /**
    * Logout function for logged users
    * @param _req
    * @param res
    */
   public logout = (_req: Request, res: Response) => {
      res.cookie('jwt', 'loggedout', {
         expires: new Date(Date.now() + 10 * 1000),
         httpOnly: false,
      });
      res.status(200).json({ status: 'success' });
   };

   /**
    * Update password function for logged users
    */
   public updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findOne(req.user).select('+password');

      if (!user) return next(new AppError('Something went very wrong!', 404));

      if (!(await this.correctPassword(req.body.passwordCurrent, user.password))) {
         return next(new AppError('Your current password is wrong.', 401));
      }

      user.password = req.body.newPassword;
      user.passwordConfirm = req.body.passwordConfirm;
      await user.save();

      // 4) Log user in, send JWT
      this.createAndSendToken(user, 200, req, res);
   });

   /**
    * Forgot password function for not logged users
    * Uses the createPasswordResetToken function
    */
   public forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // Find the user, send error if not exists with this email
      const user: IUser | null = await User.findOne({ email: req.body.email });

      if (!user) {
         return next(new AppError('There is no user with email address.', 404));
      }

      // Create the token
      const resetToken = this.createPasswordResetToken(user);
      await (user as UserType).save({ validateBeforeSave: false });

      // Send the reset mail to the user
      try {
         const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
         await new Email(user, resetURL).sendPasswordReset();
         res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
         });
      } catch (err) {
         user.passwordResetToken = undefined;
         user.passwordResetExpires = undefined;
         await (user as UserType).save({ validateBeforeSave: false });
         return next(new AppError('There was an error sending the mail. Try again later!', 500));
      }
   });

   public resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');

      const user: IUser | null = await User.findOne({
         passwordResetToken: hashed,
      });

      if (!user) {
         return next(new AppError('Token is invalid or has expired', 400));
      }

      console.log(req.body);

      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await (user as UserType).save();

      this.createAndSendToken(user, 200, req, res);
   });
}
