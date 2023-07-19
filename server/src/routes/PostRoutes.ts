import { Router } from 'express';

import PostController from '../controllers/PostController';
import AuthController from '../controllers/AuthController';
import CommentRouter from './CommentRoutes';
import { resizePhoto } from '../middlewares/UploadPhoto';

const router: Router = Router();
const postController = new PostController();
const authController = new AuthController();

router.use('/:id/comment', CommentRouter);

router
   .route('/')
   .get(postController.getAllPost)
   .post(authController.protected, postController.uploadPostPhoto, resizePhoto, postController.createPost);

router.route('/:id').get(postController.getOnePost);

export default router;
