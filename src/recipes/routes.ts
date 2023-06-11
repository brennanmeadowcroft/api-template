import { Router } from 'express';
import RecipeController from './controllers';

const router = Router();
const controller = RecipeController();

router.get('/good', controller.good);
router.get('/bad', controller.bad);

export default router;
