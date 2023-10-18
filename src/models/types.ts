export interface TPayload {
  patient_id?: string;
  patient_name: string;
  records?: TRecord[] | null;
}

export interface TRecord {
  record_id?: string;
  heart_rate: number;
  body_temperature: number;
  patient_frequent_sickness?: string | null;
  patient_id: string;
}
