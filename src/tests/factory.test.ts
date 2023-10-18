import { Response } from 'express';
import FPatient from '../models/factory';
import { TPayload } from '../models/types';
import { InvalidElementError, ElementNotFoundError, ForbiddenError, InvalidPayloadError, UnauthorizedError, TResponse } from '../utils/res';

export const sample_data = [
  {
    patient_name: 'John Doe',
    heart_rate: 100,
    body_temperature: 37.5,
    patient_frequent_sickness: 'headache',
  },
  {
    patient_name: 'Jane Doe',
    heart_rate: 90,
    body_temperature: 36.5,
    patient_frequent_sickness: 'diarrhea',
  },
  {
    patient_name: 'John Smith',
    heart_rate: 110,
    body_temperature: 38.5,
  },
  {
    patient_name: 1,
    heart_rate: '120',
    body_temperature: '39.5',
  },
];

describe('Factory and Validator classes test', () => {
  describe('Factory class test', () => {
    it('should create a patient with valid data', () => {
      const patient = new FPatient(sample_data[0] as TPayload);

      expect(patient).toHaveProperty('getData');
      expect(patient.getData()).toHaveProperty('patient_id');
      expect(patient.getData()).toStrictEqual({ ...sample_data[0], patient_id: patient.getData().patient_id });
    });
  });

  describe('Validator class test', () => {
    it('should validate a valid patient', () => {
      const patient = new FPatient(sample_data[2] as TPayload);

      expect(patient).toHaveProperty('getData');
      expect(patient.getData()).toHaveProperty('patient_id');
      expect(patient.getData()).toStrictEqual({ ...sample_data[2], patient_id: patient.getData().patient_id, patient_frequent_sickness: null });
    });

    it('should validate an invalid patient', () => {
      expect(() => new FPatient(sample_data[3] as TPayload)).toThrow(InvalidElementError);
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
