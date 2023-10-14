import { Request, Response } from 'express';
import { TResponse } from '../utils/res';

const defController = {
  default: async (_req: Request, res: Response) => {
    new TResponse(200, 'HealthTrack Pro Plus API Service').send(res);
  },
};

export default defController;
