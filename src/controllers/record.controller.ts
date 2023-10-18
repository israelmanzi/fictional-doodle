import { Request, Response } from 'express';
import RecordService from '../services/record.service';
import { TResponse } from '../utils/res';

const recordService = new RecordService();

const recordController = {
  getRecords: async (req: Request, res: Response) => {
    const records = await recordService.getRecords();

    new TResponse(200, records).send(res);
  },

  getRecordByPatient: async (req: Request, res: Response) => {
    const { patient_id } = req.params;

    const record = await recordService.getRecordByPatient(patient_id);

    new TResponse(200, record).send(res);
  },

  createRecord: async (req: Request, res: Response) => {
    const record = await recordService.createRecord(req.body);

    new TResponse(200, record).send(res);
  },

  deleteRecord: async (req: Request, res: Response) => {
    const { record_id } = req.params;

    const record = await recordService.deleteRecord(record_id);

    new TResponse(200, record).send(res);
  },
};

export default recordController;
