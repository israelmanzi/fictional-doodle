import { PrismaClient } from '@prisma/client';
import { ElementNotFoundError, InvalidElementError } from '../utils/res';
import { TRecord } from '../models/types';
import { FRecord } from '../models/factory';

export default class RecordService {
  private readonly prismaService: PrismaClient;

  constructor() {
    this.prismaService = new PrismaClient({
      errorFormat: 'minimal',
      log: ['query', 'info', 'warn'],
    });
  }

  async getRecords(): Promise<TRecord[]> {
    const records = (await this.prismaService.record.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })) as TRecord[];

    if (!records || records.length === 0) throw new ElementNotFoundError('No records found!');

    return records;
  }

  async getRecordByPatient(patient_id: string): Promise<TRecord[]> {
    const dRecord = (await this.prismaService.record.findMany({
      where: {
        patient_id: patient_id,
      },
    })) as TRecord[];

    if (!dRecord) throw new ElementNotFoundError(`Record with patient id ${patient_id} not found!`);

    return dRecord;
  }

  async createRecord(payload: TRecord): Promise<TRecord> {
    const record = new FRecord(payload);

    const cRecord = (await this.prismaService.record.create({
      data: {
        Patient: {
          connect: {
            patient_id: record.getData().patient_id!,
          },
        },
        body_temperature: record.getData().body_temperature,
        heart_rate: record.getData().heart_rate,
        record_id: record.getData().record_id!,
        patient_frequent_sickness: record.getData().patient_frequent_sickness,
      },
    })) as TRecord;

    if (!cRecord) throw new InvalidElementError(`Patient with id ${record.getData().patient_id} not found!`);

    return cRecord;
  }

  async deleteRecord(record_id: string): Promise<{
    message: string;
  }> {
    const dRecord = (await this.prismaService.record.delete({
      where: {
        record_id: record_id,
      },
    })) as TRecord;

    if (!dRecord) throw new ElementNotFoundError(`Record with id ${record_id} not found!`);

    return {
      message: `Record with id ${record_id} has been deleted!`,
    };
  }
}
