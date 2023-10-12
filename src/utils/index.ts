import { z } from 'zod';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const EnvVars = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z
    .string()
    .default('3000')
    .transform((val: string) => parseInt(val, 10)),
});

export const env = EnvVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvVars> {}
  }
}

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
