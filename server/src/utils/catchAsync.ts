import { Request, Response, NextFunction } from 'express';

/**
 * Global catchAsync funtion for avoid try catches
 * @property {Object} req
 * @property {Object} res
 * @property {Object} next
 */
export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
   };
};
