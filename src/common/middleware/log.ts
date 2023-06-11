import { Response, Request, NextFunction } from 'express';
import Logger, { LoggerOptions } from '../utils/Logger';

export function requestLogger(logger: Logger, logRequest = false) {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.log = logger;
    if (logRequest) {
      req.log.info(`[${req.method}] ${req.path}`, { params: req.params });
    }
    next();
  };
}

export function errorLogger() {
  return (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err) {
      if (req.log) {
        req.log.error(`Error received: ${err.message}`, { error: err });
      } else {
        const logger = new Logger({ logLevel: 'error' });
        logger.error(`Error received: ${err.message}`, { error: err });
      }
    }
    next(err);
  };
}
