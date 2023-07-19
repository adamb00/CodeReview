import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import { resizePhoto } from '../middlewares/UploadPhoto';

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

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protected);

router.get('/me', userController.getMe, userController.getOneUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.route('/updateMe').patch(userController.uploadUserPhoto, resizePhoto, userController.updateMe);

router.patch('/addToFavorites', userController.addToFavorites);
router.get('/getFavorites', userController.getUserFavorites);

router.route('/:id').get(userController.getOneUser);

export default router;
