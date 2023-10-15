import express, { Application } from 'express';
import cors from 'cors';
import indexRouter from './routes/index.route';

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
  .use(express.urlencoded({ extended: true }))
  .use('/api/v1', indexRouter);

export default app;
