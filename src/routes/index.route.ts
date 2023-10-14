import { Router } from 'express';
import defController from '../controllers/def.controller';
import errorHandler from '../utils/res';

const router = Router();

router.get('/', errorHandler(defController.default));

export default router;
