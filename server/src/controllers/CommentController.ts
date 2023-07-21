import * as handler from '../utils/handleControllers';
import Comment from '../models/CommentModel';
import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export default class CommentController {
   /**
    * Create a comment with the global handler function
    */
   public createComment = handler.createOne(Comment);

   /**
    * Get all comment with the global handler function
    */
   public getAllComment = handler.getAll(Comment);

   /**
    * Get one comment with the global handler function
    */
   public getOneComment = handler.getOne(Comment);

   public getAllCommentOnPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const post = req.params.id;

      const comments = await Comment.find().where('post').equals(post);

      if (!comments) return next(new AppError('No comment found on this post', 404));

      res.status(200).json({
         status: 'success',
         data: comments,
      });
   });
}
