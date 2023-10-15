import { PrismaClient } from '@prisma/client';
import { TPayload } from '../models/factory/types';
import { ElementNotFoundError } from '../utils/res';
import FPatient from '../models/factory';

export default class PatientService {
  private readonly prismaService: PrismaClient;

  constructor() {
    this.prismaService = new PrismaClient({
      errorFormat: 'minimal',
      log: ['query', 'info', 'warn'],
    });
  }

  async getPatients(): Promise<TPayload[]> {
    const patients = (await this.prismaService.patient.findMany()) as TPayload[];

    if (!patients || patients.length === 0) throw new ElementNotFoundError('No patients found!');

    return patients;
  }

  async getPatient(id: string): Promise<TPayload> {
    const dPatient = (await this.prismaService.patient.findUnique({
      where: {
        patient_id: id,
      },
    })) as TPayload;

    if (!dPatient) throw new ElementNotFoundError(`Patient with id ${id} not found!`);

    return dPatient;
  }

  async createPatient(payload: TPayload): Promise<TPayload> {
    const patient = new FPatient(payload);

    const cPatient = (await this.prismaService.patient.create({
      data: {
        body_temperature: patient.getData().body_temperature,
        heart_rate: patient.getData().heart_rate,
        patient_name: patient.getData().patient_name,
        patient_id: patient.getData().patient_id!,
        patient_frequent_sickness: patient.getData().patient_frequent_sickness,
      },
    })) as TPayload;

    if (!cPatient) throw new ElementNotFoundError(`Patient with id ${patient.getData().patient_id} not found!`);

    return cPatient;
  }

  async updatePatient(patient_id: string, uPatient: TPayload): Promise<TPayload> {
    const patient = new FPatient(uPatient);

    const uPatientData = (await this.prismaService.patient.update({
      where: {
        patient_id,
      },
      data: {
        body_temperature: patient.getData().body_temperature,
        heart_rate: patient.getData().heart_rate,
        patient_name: patient.getData().patient_name,
        patient_frequent_sickness: patient.getData().patient_frequent_sickness,
      },
    })) as TPayload;

    if (!uPatientData) throw new ElementNotFoundError(`Patient with id ${patient_id} not found!`);

    return uPatientData;
  }

  async deletePatient(id: string): Promise<{
    message: string;
  }> {
    const dPatient = (await this.prismaService.patient.delete({
      where: {
        patient_id: id,
      },
    })) as TPayload;

    if (!dPatient) throw new ElementNotFoundError(`Patient with id ${id} not found!`);

    return {
      message: `Patient with id ${id} deleted!`,
    };
  }
}
