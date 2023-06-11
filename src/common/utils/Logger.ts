export enum LOG_LEVELS {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LoggerOptions {
  logLevel: LogLevel;
}

export default class Logger {
  private options: LoggerOptions = {
    logLevel: LOG_LEVELS.INFO,
  };
  private logInt: any = {
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
  };
  private decorators: any = {};

  constructor(options: LoggerOptions, decorators: any = {}) {
    this.options = { ...this.options, ...options };
    this.decorators = { ...this.decorators, ...decorators };
  }

  private _shouldLog(type: string): boolean {
    const { logLevel } = this.options;
    return this.logInt[type] >= this.logInt[logLevel];
  }

  private _log(type: string, message: string, attrs?: object) {
    if (this._shouldLog(type)) {
      const msg = { type, message, metadata: { ...this.decorators, ...attrs } };
      console.log(msg);
    }
  }

  public decorate(decorators: any) {
    this.decorators = { ...this.decorators, ...decorators };
  }

  public debug(message: string, attrs?: object) {
    this._log('debug', message, attrs);
  }
  public error(message: string, attrs?: object) {
    this._log('error', message, attrs);
  }
  public info(message: string, attrs?: object) {
    this._log('info', message, attrs);
  }
  public warn(message: string, attrs?: object) {
    this._log('warn', message, attrs);
  }
}
