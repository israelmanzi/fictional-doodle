import { Router } from 'express';
import defController from '../controllers/def.controller';
import errorHandler from '../utils/res';

const router = Router();

router
  .get('/', errorHandler(defController.default))
  .get('/patients', errorHandler(defController.getPatients))
  .get('/patients/:id', errorHandler(defController.getPatientById))
  .post('/patients', errorHandler(defController.createPatient))
  .put('/patients/:id', errorHandler(defController.updatePatient))
  .delete('/patients/:id', errorHandler(defController.deletePatient));

export default router;
