import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

export default class ViewController {
   public resetPassword = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
      const { token } = req.params;
      res.status(200).render('resetPassword', {
         title: 'Reset Password',
         token,
      });
   });
}
