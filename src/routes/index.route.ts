import { Router } from 'express';
import patientController from '../controllers/patient.controller';
import recordController from '../controllers/record.controller';
import errorHandler from '../utils/res';

const router = Router();

router
  .get('/', errorHandler(patientController.default))
  .get('/patients', errorHandler(patientController.getPatients))
  .get('/patients/:id', errorHandler(patientController.getPatientById))
  .post('/patients', errorHandler(patientController.createPatient))
  .patch('/patients/:id', errorHandler(patientController.updatePatient))
  .delete('/patients/:id', errorHandler(patientController.deletePatient))
  .get('/patients/:id/records', errorHandler(patientController.getPatientWithRecords))
  .post('/patients/:id/records', errorHandler(patientController.newRecordForPatient))
  .get('/records/:patient_id', errorHandler(recordController.getRecordByPatient))
  .get('/records', errorHandler(recordController.getRecords))
  .delete('/records/:record_id', errorHandler(recordController.deleteRecord));

export default router;
