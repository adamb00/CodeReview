import * as handler from '../utils/handleControllers';
import Post from '../models/PostModel';
import { upload } from '../middlewares/UploadPhoto';
import catchAsync from '../utils/catchAsync';
import { Request, Response } from 'express';

export default class PostController {
   public uploadPostPhoto = upload.single('photo');
   /**
    * Create a post with the global handler function
    */
   public createPost = handler.createOne(Post);

   /**
    * Get all post with the global handler function
    */
   public getAllPost = handler.getAll(Post);

   /**
    * Get one post with the global handler function
    */
   public getOnePost = handler.getOne(Post);

   /**
    * Get currently logged in users posts
    */
   public getUserPost = catchAsync(async (_req: Request, res: Response) => {
      const user = res.locals.user;

      const posts = await Post.find().where('user').equals(user._id);

      res.status(200).json({ status: 'success', data: posts });
   });
}
