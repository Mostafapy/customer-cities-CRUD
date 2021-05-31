// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Load imports
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Logger } from './utils/logger.utils';
import sequelize from './entities/sequelize';
import routes from './routes/index';

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

// Initialize routes
server.use(routes);

// Sync sequelize in development only and migration sync: true for one time
sequelize
  .authenticate()
  .then(async () => {
    logger.log('Sequelize Connection has been established successfully.');
    if (process.argv[2] === '-s') {
       sequelize.sync({ force: true });
    }
  })
  .catch((err: Error) => {
    logger.error('Sequelize Unable to connect to the database', { err });
  });

  // Server is listening for port
server.listen(process.env.PORT, () =>
    logger.log(`Server Listen Successfully To Port ${process.env.PORT}`),
  );
