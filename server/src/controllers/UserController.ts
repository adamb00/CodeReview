import { NextFunction, Request, Response } from 'express';

import * as handler from '../utils/handleControllers';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import User from '../models/UserModel';
import { upload } from '../middlewares/UploadPhoto';
import Post from '../models/PostModel';

export default class UserController {
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

   public uploadUserPhoto = upload.single('photo');

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

   /**
    * Add post to favorites
    */
   public addToFavorites = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const post = await Post.findById(req.body.post);
      const user = await User.findById(req.user.id);

      if (!post) return next(new AppError('No post found with that id', 404));
      if (!user) return next(new AppError('No user found with that id', 404));

      await user.addFavorite(post.id);
      await user.save({ validateBeforeSave: false });

      console.log(user);

      res.status(200).json({
         status: 'success',
         user,
      });
   });

   public getUserFavorites = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findById(req.user.id);

      if (!user) return next(new AppError('No user found with that id', 404));

      const favoritePostsIds = user.favoritePosts;

      const favoritePostsPromises = favoritePostsIds.map(async (postId: string) => {
         const post = await Post.findById(postId);
         if (!post) return next(new AppError('No post found with that id', 404));
         return post;
      });

      const favoritePosts = await Promise.all(favoritePostsPromises);

      res.status(200).json({
         status: 'success',
         data: favoritePosts,
      });
   });
}
