// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Load imports
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Logger } from './utils/logger.utils';

// Intialize logger
const logger = new Logger('server');

// Intialize Express server
const server: Application = express();

// Using cors
server.use(cors());

// Enable json typed through server apis
server.use(express.json());

// Use logger
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
