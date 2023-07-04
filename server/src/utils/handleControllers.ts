import catchAsync from './catchAsync';
import AppError from './appError';
import { NextFunction, Request, Response } from 'express';

import User from '../models/UserModel';
import Post from '../models/PostModel';
import Comment from '../models/CommentModel';

type GlobalType = typeof User | typeof Post | typeof Comment;

/**
 * Global function to create one element
 * @param Model
 * @returns a promise with the newly created Model <User | Post | Comment>
 */
export function createOne(Model: GlobalType) {
   return catchAsync(async (req: Request, res: Response): Promise<void> => {
      if (!req.body.user) req.body.user = req.user.id;
      if (!req.body.post) req.body.post = req.params.id;

      const doc = await Model.create(req.body);

      res.status(201).json({
         status: 'success',
         data: { data: doc },
      });
   });
}

/**
 * Global function to get all element
 * @param Model
 * @returns a promise with all elements of <User | Post | Comment>
 */
export function getAll(Model: GlobalType) {
   return catchAsync(async (_req: Request, res: Response): Promise<void> => {
      const doc = await Model.find();

      res.status(200).json({
         status: 'success',
         result: doc.length,
         data: doc,
      });
   });
}

/**
 * Global function to get one element
 * @param Model
 * @returns a promise with one element of <User | Post | Comment>
 */
export function getOne(Model: GlobalType) {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const doc = await Model.findById(req.params.id);

      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }
      res.status(200).json({
         status: 'success',
         data: doc,
      });
   });
}
