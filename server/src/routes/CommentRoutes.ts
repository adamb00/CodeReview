import { Router } from 'express';

import CommentController from '../controllers/CommentController';
import AuthController from '../controllers/AuthController';

const router: Router = Router({ mergeParams: true });
const commentController = new CommentController();
const authController = new AuthController();

router.route('/').get(commentController.getAllComment).post(authController.protected, commentController.createComment);

router.route('/:id').get(commentController.getOneComment);

export default router;
