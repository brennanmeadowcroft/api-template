import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../types/server/api';
import { AppError } from '../types/server/errors';

export default function errorHandler() {
  const isTrustedError = (err: Error): boolean => {
    if (err instanceof AppError) {
      return err.isOperational;
    }

    return false;
  };

  const handleTrustedError = (err: AppError, res: Response): void => {
    res
      .status(err.httpCode)
      .json({ error: { message: err.message, status: err.httpCode } });
  };

  const handleUnknownError = (err: Error, res: Response): void => {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Internal Server Error',
        status: HttpCode.INTERNAL_SERVER_ERROR,
      },
    });
  };

  return (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (isTrustedError(err) && res) {
      handleTrustedError(err as AppError, res);
    } else {
      handleUnknownError(err, res);
    }
  };
}
