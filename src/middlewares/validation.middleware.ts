import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';
import { EMessages } from '../enums/messages.enum';
import { Logger } from '../utils/logger.utils';

const logger = new Logger('Validation middleware');

/**
 * Middleware to validation request using express-validator package
 */

const validationMiddleware = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('validationMiddleware Error', { err: new Error('Input validation Errors') });

      return res.status(422).json({
        message: EMessages.serverError,
        error: 'Validation Error',
        validationErrors: errors,
        success: false,
        data: null,
      });
    }

    next();
  };
};


export default validationMiddleware;
