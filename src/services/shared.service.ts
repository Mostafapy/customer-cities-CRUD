import { Logger } from '../utils/logger.utils';

// initialize logger
const logger: Logger = new Logger('Common Service');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const checkFoundRecordById = async(model: any, id: number, options?: any): Promise<any> => {
    try {
        let condition: any;

        if (options) {
          condition = { where: { id }, ...options };
        } else {
          condition = { where: { id } };
        }

        const foundRecord = await model.findOne(condition);

        const notFoundError = new Error(`Record of id ${id} is not found`);

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
    checkFoundRecordById
};
