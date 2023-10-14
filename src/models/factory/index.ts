/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from 'uuid';
import { z } from 'zod';
import { TPayload } from './types';
import { InvalidElementError } from '../../utils/res';

const factory_schema = {
  heart_rate: z.number().min(0).max(200),
  body_temperature: z.number().min(32).max(40),
  patient_name: z.string().min(3).max(50),
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

export default class FPatient {
  private heart_rate: number;
  private body_temperature: number;
  private patient_name: string;
  private patient_id: string;

  constructor(heart_rate: number, body_temperature: number, patient_name: string) {
    this.heart_rate = new Validator(heart_rate, factory_schema.heart_rate).getValue();
    this.body_temperature = new Validator(body_temperature, factory_schema.body_temperature).getValue();
    this.patient_name = new Validator(patient_name, factory_schema.patient_name).getValue();
    this.patient_id = v4();
  }

  public getData(): TPayload {
    return {
      heart_rate: this.heart_rate,
      body_temperature: this.body_temperature,
      patient_name: this.patient_name,
      patient_id: this.patient_id,
    };
  }
}
