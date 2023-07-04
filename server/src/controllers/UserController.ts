import * as handler from '../utils/handleControllers';
import User from '../models/UserModel';
import { NextFunction, Request, Response } from 'express';

export default class UserController {
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
    * Get currently logged in user
    * @param req
    * @param next
    */
   public getMe = (req: Request, _res: Response, next: NextFunction) => {
      req.params.id = req.user.id;
      console.log(req.params);
      next();
   };
}
