/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from 'uuid';
import { z } from 'zod';
import { TPayload, TRecord } from '../types';
import { InvalidElementError } from '../../utils/res';

export const patient_schema = {
  patient_name: z.string().min(3).max(50),
};

export const record_schema = {
  heart_rate: z.number().min(0).max(200),
  body_temperature: z.number().min(0).max(50),
  patient_frequent_sickness: z.string().min(3).max(50),
};

export class Validator<T> {
  private value: T;

  constructor(_value: T, schema: z.Schema<T>) {
    try {
      this.value = schema.parse(_value);
    } catch (error: any) {
      throw new InvalidElementError(error);
    }
  }

  public getValue(): T {
    return this.value;
  }
}

export class FRecord {
  private heart_rate: number;
  private body_temperature: number;
  private patient_frequent_sickness?: string | null;
  private record_id: string;
  private patient_id: string;

  constructor({ heart_rate, body_temperature, patient_frequent_sickness, patient_id }: TRecord) {
    this.heart_rate = new Validator(heart_rate, record_schema.heart_rate).getValue();
    this.body_temperature = new Validator(body_temperature, record_schema.body_temperature).getValue();
    patient_frequent_sickness &&
      (this.patient_frequent_sickness = new Validator(patient_frequent_sickness, record_schema.patient_frequent_sickness).getValue());
    this.record_id = v4();
    this.patient_id = patient_id;
  }

  public getData(): TRecord {
    return {
      heart_rate: this.heart_rate,
      body_temperature: this.body_temperature,
      patient_frequent_sickness: this.patient_frequent_sickness || null,
      record_id: this.record_id,
      patient_id: this.patient_id,
    };
  }
}

export default class FPatient {
  private patient_name: string;
  private patient_id: string;
  private records?: TRecord[] | null;

  constructor({ patient_name, records }: TPayload) {
    this.patient_name = new Validator(patient_name, patient_schema.patient_name).getValue();
    this.patient_id = v4();
    this.records = records?.map((record) => new FRecord(record).getData()) || null;
  }

  public getData(): TPayload {
    return {
      patient_name: this.patient_name,
      patient_id: this.patient_id,
      records: this.records,
    };
  }
}
