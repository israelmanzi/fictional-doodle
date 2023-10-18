import { Request, Response } from 'express';
import { TResponse } from '../utils/res';
import PatientService from '../services/patient.service';

const patientService = new PatientService();

const patientController = {
  default: async (_req: Request, res: Response) => {
    new TResponse(200, 'HealthTrack Pro Plus API Service').send(res);
  },

  getPatients: async (_req: Request, res: Response) => {
    const patients = await patientService.getPatients();
    new TResponse(200, patients).send(res);
  },
  getPatientById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await patientService.getPatient(id);
    new TResponse(200, patient).send(res);
  },
  createPatient: async (req: Request, res: Response) => {
    const patient = await patientService.createPatient(req.body);
    new TResponse(200, patient).send(res);
  },

  updatePatient: async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await patientService.updatePatient(id, req.body);
    new TResponse(200, patient).send(res);
  },
  deletePatient: async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await patientService.deletePatient(id);
    new TResponse(200, patient).send(res);
  },

  getPatientWithRecords: async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await patientService.getPatientWithRecords(id);
    new TResponse(200, patient).send(res);
  },

  newRecordForPatient: async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await patientService.recordForPatient(id, req.body);
    new TResponse(200, patient).send(res);
  },
};

export default patientController;
