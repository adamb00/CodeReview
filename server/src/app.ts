import express, { Application, NextFunction, Request, Response } from 'express';
import rateLimiter, { RateLimitRequestHandler } from 'express-rate-limit';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import CommentRouter from './routes/CommentRoutes';
import UserRouter from './routes/UserRoutes';
import PostRouter from './routes/PostRoutes';
import AppError from './utils/appError';

export default class App {
   public app: Application;

   constructor() {
      this.app = express();
      this.security();
      this.config();
      this.routes();
      this.errors();
   }

   /**
    * Security middlewares
    */
   private security(): void {
      this.app.enable('trust proxy');
      this.app.use(cors());
      this.app.options('*', cors());
      this.app.use(helmet({ contentSecurityPolicy: false }));
      this.app.use(express.json({ limit: '10kb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
      this.app.use(cookieParser());
      this.app.use(ExpressMongoSanitize());
   }

   /**
    * Config middlewares
    * @property {string} NODE_ENV
    */
   private config(): void {
      // SET MORGAN FOR DEVELOPMENT COSNOLE.LOGS
      if (process.env.NODE_ENV === 'development') this.app.use(morgan('dev'));

      // SET LIMITER FOR DEFINE MAXIMUM RATE LIMITS
      const limiter: RateLimitRequestHandler = rateLimiter({
         max: 100,
         windowMs: 60 * 60 * 1000,
         message: 'Too many request from this IP, please try again in an hour',
      });

      // USE THE LIMITER
      this.app.use('/api', limiter);
   }

   /**
    * Returns every routes
    * @prop {User} UserRouter
    */
   private routes(): void {
      // User router
      this.app.use('/api/v1/users', UserRouter);

      // Post router
      this.app.use('/api/v1/posts', PostRouter);

      // Comment router
      this.app.use('/api/v1/comments', CommentRouter);
   }

   /**
    * Handle errors middleware
    */
   private errors(): void {
      this.app.all('*', (req: Request, _res: Response, next: NextFunction) => {
         next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
      });
   }
}
