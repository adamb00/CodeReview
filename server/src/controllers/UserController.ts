import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import path from 'path';

import * as handler from '../utils/handleControllers';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import User from '../models/UserModel';

export default class UserController {
   private multerStorage = multer.memoryStorage();

   private multerFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (file.mimetype.startsWith('image')) {
         cb(null, true);
      } else {
         cb(null, false);
      }
   };

   private upload = multer({ storage: this.multerStorage, fileFilter: this.multerFilter });

   public resizeUserPhoto = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.file) return next();

      req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

      const outputPath = path.join(__dirname, '../../../client/public', req.file.filename);

      await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(outputPath);

      next();
   });

   public uploadUserPhoto = this.upload.single('photo');

   /**
    * Filter the body to check which field should be included in the query
    * @param obj
    * @param allowedFields
    * @returns
    */
   private filterObj = (obj: { [x: string]: string }, ...allowedFields: string[]) => {
      const newObj: { [key: string]: string } = {};
      Object.keys(obj).forEach(el => {
         if (allowedFields.includes(el)) newObj[el] = obj[el];
      });
      return newObj;
   };

   /**
    * Create a user with the global handler function
    */
   public createUser = handler.createOne(User);

   /**
    * Get all user with the global handler function
    */
   public getAllUser = handler.getAll(User);

   /**
    * Get one user with the global handler function
    */
   public getOneUser = handler.getOne(User);

   /**
    * Update one user with the global handler function
    */
   public updateUser = handler.updateOne(User);

   /**
    * Get currently logged in user
    * @param req
    * @param next
    */
   public getMe = (req: Request, _res: Response, next: NextFunction) => {
      req.params.id = req.user.id;
      next();
   };

   /**
    * Update currently logged in user's data, but not password!
    */
   public updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (req.body.password || req.body.passwordConfirm) {
         return next(new AppError('This route is not for password updates.', 400));
      }

      const filteredBody = this.filterObj(req.body, 'firstName', 'lastName', 'email');
      if (req.file) filteredBody.photo = req.file.filename;

      const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
         new: true,
         runValidators: true,
      });

      res.status(200).json({
         status: 'success',
         data: updatedUser,
      });
   });
}
