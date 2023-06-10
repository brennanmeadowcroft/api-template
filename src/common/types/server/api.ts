import { Request } from 'express';
import Logger from '../../utils/Logger';

export interface RequestParams {}

export interface APIResponse<Data> {
  data: Data;
}

export interface APIError {
  status: number;
  message: string;
}

export interface LogRequest extends Request {
  log: Logger;
}

export interface BaseParams<IDType = string> {
  id: IDType;
}

export interface Empty {}

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
