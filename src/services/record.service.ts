import { PrismaClient } from '@prisma/client';
import { ElementNotFoundError } from '../utils/res';
import { TRecord } from '../models/types';

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

    if (!dRecord || dRecord.length === 0) throw new ElementNotFoundError(`No records registered on patient with patient id ${patient_id} found!`);

    return dRecord;
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
