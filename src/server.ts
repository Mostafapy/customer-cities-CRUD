import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Logger } from './utils/logger.utils';

const logger = new Logger('server');
const server: Application = express();

server.use(cors());
server.use(express.json());
server.use((req: Request, _res: Response, next: NextFunction) => {
  logger.log('request', {
    body: req.body,
    query: req.query,
    params: req.params,
    token: req.headers.authorization || null,
    path: req.path,
  });
  next();
});

export default server;
