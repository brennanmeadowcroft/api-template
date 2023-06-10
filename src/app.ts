import express, { Express, Request, Response, NextFunction } from 'express';
import Logger, { LOG_LEVELS } from './common/utils/Logger';
import { errorLogger, requestLogger } from './common/middleware/log';
import { default as recipeRouter } from './recipes/routes';
import errorHandler from './common/middleware/errorHandler';

const logger = new Logger({ logLevel: LOG_LEVELS.INFO });
const app: Express = express();

const LOG_REQUEST = true;
app.use(requestLogger(logger, LOG_REQUEST));

app.use('/recipes', recipeRouter);

app.use(errorLogger());
app.use(errorHandler());

export default app;
