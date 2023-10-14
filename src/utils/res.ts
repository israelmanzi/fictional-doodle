import { Request, Response } from 'express';

export class InvalidElementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidElementError';
  }
}

export class ElementNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ElementNotFoundError';
  }
}

export class InvalidPayloadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPayloadError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class TResponse {
  private body: unknown;
  private status: number;

  constructor(status: number, body: unknown) {
    this.body = body;
    this.status = status;
  }

  public json(): unknown {
    return JSON.stringify(this.body);
  }

  public send(response: Response): void {
    response.status(this.status).json(this.body);
  }
}

export default (callback: (req: Request, res: Response) => Promise<void>) => async (req: Request, res: Response) => {
  try {
    await callback(req, res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    switch (error.constructor) {
      case InvalidElementError:
        res.status(400).json({ error: error.message });
        break;
      case ElementNotFoundError:
        res.status(404).json({ error: error.message });
        break;
      case InvalidPayloadError:
        res.status(400).json({ error: error.message });
        break;
      case UnauthorizedError:
        res.status(401).json({ error: error.message });
        break;
      default:
        res.status(500).json({ error: error.message });
        break;
    }
  }
};
