import { Logger } from './utils/logger.utils';
import server from './server';

const logger = new Logger('Index');

// Server is listening for port
server.listen(process.env.PORT, () =>
  logger.log(`Server Listen Successfully To Port ${process.env.PORT}`),
);

