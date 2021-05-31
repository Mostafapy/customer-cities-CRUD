import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { EMessages } from '../enums/messages.enum';
import { Logger } from '../utils/logger.utils';

const logger = new Logger('Validation middleware');

const errorFormatter = (obj: ValidationError) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${obj.location}[${obj.param}]: ${obj.msg}`;
};

/**
 * Middleware to validation request using express-validator package
 */

const validationMiddleware = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        logger.error('validationMiddleware Error', {
          err: new Error('Input validation Errors'),
        });
  
        return res.status(422).json({
          message: EMessages.serverError,
          error: 'Validation Error',
          validationErrors: errors.array(),
          success: false,
          data: null,
        });
      }
      next();
  };
};

export default validationMiddleware;
