import Logger from '../../utils/Logger';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: Logger;
    }
  }
}
