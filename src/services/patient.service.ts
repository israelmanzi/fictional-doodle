import { PrismaClient } from '@prisma/client';
import { ElementNotFoundError } from '../utils/res';
import FPatient, { FRecord } from '../models/factory';
import { TPayload, TRecord } from '../models/types';

export default class PatientService {
  private readonly prismaService: PrismaClient;

  constructor() {
    this.prismaService = new PrismaClient({
      errorFormat: 'minimal',
      log: ['query', 'info', 'warn'],
    });
  }

  async getPatients(): Promise<TPayload[]> {
    const patients = (await this.prismaService.patient.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    })) as TPayload[];

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
        patient_name: patient.getData().patient_name,
        patient_id: patient.getData().patient_id!,
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
        patient_name: patient.getData().patient_name,
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

  async getPatientWithRecords(id: string): Promise<unknown> {
    const patientWithRecords = await this.prismaService.patient.findUnique({
      where: {
        patient_id: id,
      },
      include: {
        records: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    });

    if (!patientWithRecords || patientWithRecords.records.length == 0 || !patientWithRecords.records)
      throw new ElementNotFoundError(`Patient with id ${id} not found or has no records!`);

    return patientWithRecords;
  }

  async recordForPatient(id: string, record: TRecord): Promise<unknown> {
    const fRecord = new FRecord(record);

    const patientWithAddedRecord = await this.prismaService.patient.update({
      where: {
        patient_id: id,
      },
      data: {
        records: {
          create: {
            body_temperature: fRecord.getData().body_temperature,
            heart_rate: fRecord.getData().heart_rate,
            patient_frequent_sickness: fRecord.getData().patient_frequent_sickness,
            record_id: fRecord.getData().record_id!,
          },
        },
      },
    });

    if (!patientWithAddedRecord) throw new ElementNotFoundError(`Patient with id ${id} not found!`);

    return patientWithAddedRecord;
  }
}
