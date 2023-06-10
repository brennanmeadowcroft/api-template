import { Router } from 'express';
import RecipeController from './controllers';

const router = Router();
const controller = RecipeController();

router.get('/share', controller.share);

export default router;
