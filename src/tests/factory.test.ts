import { Response } from 'express';
import FPatient, { FRecord } from '../models/factory';
import { TPayload, TRecord } from '../models/types';
import { InvalidElementError, ElementNotFoundError, ForbiddenError, InvalidPayloadError, UnauthorizedError, TResponse } from '../utils/res';

const match_sample_data: TPayload[] = [
  {
    patient_name: 'John Doe',
  },
  {
    patient_name: 'Jane Doe',
  },
];

const match_record_data: TRecord[] = [
  {
    heart_rate: 90,
    body_temperature: 36.5,
    patient_frequent_sickness: 'diarrhea',
    patient_id: '1',
  },

  {
    heart_rate: 70,
    body_temperature: 34.5,
    patient_frequent_sickness: 'headache',
    patient_id: '2',
  },
];

describe('Factory and Validator classes test', () => {
  describe('Factory class test', () => {
    it('should create a patient with valid data', () => {
      const patient = new FPatient(match_sample_data[0] as TPayload);

      expect(patient).toHaveProperty('getData');
      expect(patient.getData()).toHaveProperty('patient_id');
      expect(patient.getData()).toStrictEqual({ ...match_sample_data[0], patient_id: patient.getData().patient_id, records: null });
    });
  });

  describe('Validator class test', () => {
    it('should validate a valid record', () => {
      const record = new FRecord(match_record_data[0] as TRecord);

      expect(record).toHaveProperty('getData');
      expect(record.getData()).toHaveProperty('patient_id');
      expect(record.getData()).toStrictEqual({ ...match_record_data[0], patient_id: record.getData().patient_id, record_id: record.getData().record_id });
    });
  });

  describe('Throw Errors', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testError = (errorClass: any, errorMessage: string) => {
      it(`should throw ${errorClass.name} with a message`, () => {
        expect(() => {
          throw new errorClass(errorMessage);
        }).toThrow(errorMessage);
      });
    };

    testError(InvalidElementError, 'Invalid element');
    testError(ElementNotFoundError, 'Element not found');
    testError(ForbiddenError, 'Forbidden');
    testError(InvalidPayloadError, 'Invalid payload');
    testError(UnauthorizedError, 'Unauthorized');
  });

  describe('TResponse', () => {
    it('should correctly initialize status and body', () => {
      const status = 200;
      const body = { message: 'Success' };
      const response = new TResponse(status, body);

      expect(response['status']).toBe(status);
      expect(response['body']).toBe(body);
    });

    it('should correctly return JSON string', () => {
      const status = 200;
      const body = { message: 'Success' };
      const response = new TResponse(status, body);

      const jsonString = response.json();

      expect(jsonString).toBe(JSON.stringify(body));
    });

    it('should correctly send response to Express response object', () => {
      const status = 200;
      const body = { message: 'Success' };
      const response = new TResponse(status, body);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      response.send(res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(body);
    });
  });
});
