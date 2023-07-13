import express, { Application, NextFunction, Request, Response } from 'express';
import rateLimiter, { RateLimitRequestHandler } from 'express-rate-limit';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import nodeSassMiddleware from 'node-sass-middleware';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import CommentRouter from './routes/CommentRoutes';
import UserRouter from './routes/UserRoutes';
import PostRouter from './routes/PostRoutes';
import ViewRouter from './routes/ViewRoutes';
import AppError from './utils/appError';

export default class App {
   public app: Application;

   constructor() {
      this.app = express();

      // Rendering server side templates
      this.app.set('view engine', 'pug');
      this.app.set('views', path.join(__dirname, 'views'));
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
      this.app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
      this.app.options('*', cors());
      this.app.use((_req: Request, res: Response, next: NextFunction) => {
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
         res.setHeader('Access-Control-Allow-Credentials', 'true');
         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
         next();
      });
      this.app.use(helmet({ contentSecurityPolicy: false }));
      this.app.use(express.json({ limit: '10kb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
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
         max: 1000,
         windowMs: 60 * 60 * 1000,
         message: 'Too many request from this IP, please try again in an hour',
      });

      // USE THE LIMITER
      this.app.use('/api', limiter);
      this.app.use(cookieParser());

      // Set node-sass-middleware to setup server side styling
      this.app.use(
         nodeSassMiddleware({
            src: path.join(__dirname, 'public', 'scss'),
            dest: path.join(__dirname, 'public', 'css'),
            debug: true,
            outputStyle: 'compressed',
            prefix: '/css',
         })
      );
      this.app.use(express.static(path.join(__dirname, 'public')));
   }

   /**
    * Returns every routes
    * @prop {User} UserRouter
    */
   private routes(): void {
      // Server side rendering routes
      this.app.use('/', ViewRouter);

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
