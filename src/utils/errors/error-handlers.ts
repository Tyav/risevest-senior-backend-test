import { Request, Response } from 'express';
import { IError, IErrorData } from '../../interfaces';
import { ErrorCode } from './error-codes';

/**
 * Handles unknown route errors
 */
export async function unknownRouteError(
  req: Request,
  res: Response,
): Promise<Response> {
  const err = <IError>{};
  return res.status(404).json(new ResourceNotFoundError(err));
}

export class ServerError implements IError {
  code: string;
  message: string;
  data: Error;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.ERROR;
    this.message = 'An unexpected internal server error occurred';
    this.data = error.data as Error;
  }
}

export class BadRequest implements IError {
  code: string;
  message: string;
  data: IErrorData;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.VALIDATION_ERROR;
    this.message = error.message || 'Some important parameters are missing.';
    this.data = error.data || {};
  }
}

export class ResourceNotFoundError implements IError {
  code: string;
  message: string;
  data: IErrorData;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.RESOURCE_NOT_FOUND;
    this.message = error.message || 'Resource not found';
    this.data = error.data || {};
  }
}



export const HandleErrorResponse = (
  err: any,
  res: Response,
): Response => {

  // You can log error here - Since this is for a test, I have not implemented it 

  switch (err.code) {
  case ErrorCode.VALIDATION_ERROR:
    return res.status(400).json(new BadRequest(err));
  case ErrorCode.RESOURCE_NOT_FOUND:
    return res.status(404).json(new ResourceNotFoundError(err));
  default: {
    return res.status(500).json(new ServerError(err));
  }
  }
};
