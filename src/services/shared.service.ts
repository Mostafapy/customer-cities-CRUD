import { Logger } from '../utils/logger.utils';

// initialize logger
const logger: Logger = new Logger('Common Service');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const checkFoundRecord = async(model: any, query:any, options?: any): Promise<any> => {
    try {
        let conditions: any;

        if (options) {
          conditions = { ...query, ...options };
        } else {
          conditions = query;
        }

        const foundRecord = await model.findOne(conditions);

        const notFoundError = new Error('The requied record is not found');

        if (!foundRecord) {
          logger.error('Common Service Error', {
            err: notFoundError,
          });
    
          return Promise.reject(notFoundError);
        }

        return Promise.resolve(foundRecord);
          
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
  checkFoundRecord
};
