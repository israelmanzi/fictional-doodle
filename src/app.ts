import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express()
  .use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  )
  .use(express.json())
  .get('/', (req: Request, res: Response) => {
    res.json({
      message: 'HealthTrack Pro Plus API Service',
    });
  });

export default app;
