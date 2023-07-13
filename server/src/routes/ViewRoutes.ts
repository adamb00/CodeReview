import { Router } from 'express';
import ViewController from '../controllers/ViewController';

const router: Router = Router();
const viewController = new ViewController();

router.get('/resetPassword/:token', viewController.resetPassword);

export default router;
