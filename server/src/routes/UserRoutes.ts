import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

const router: Router = Router();
const authController = new AuthController();
const userController = new UserController();

// route for register a user
router.post('/signup', authController.signUp);

// login router for registered users
router.post('/login', authController.login);

// route for log out
router.get('/logout', authController.logout);

router.route('/').get(userController.getAllUser).post(userController.createUser);

router.route('/me').get(authController.protected, userController.getMe, userController.getOneUser);

router.route('/:id').get(userController.getOneUser);

export default router;
