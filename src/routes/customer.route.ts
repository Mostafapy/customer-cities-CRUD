import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import * as controller from '../controllers/customer.controller';
import * as customerValidationSchemas from '../validations/schemas/customer/index';

// [USE] /api/v1/customer
const router: Router = Router();

router.post(
  '/',
  ...customerValidationSchemas.addCustomerSchema,
  validationMiddleware(),
  controller.addCustomer
);

router.put(
  '/:id',
  ...customerValidationSchemas.editCustomerSchema,
  validationMiddleware(),
  controller.editCustomer
);

router.get(
  '/:id',
  ...customerValidationSchemas.findCustomerByIdSchema,
  validationMiddleware(),
  controller.findCustomerById
);

router.delete(
  '/:id',
  ...customerValidationSchemas.deleteCustomerByIdSchema,
  validationMiddleware(),
  controller.deleteCustomerById
);

router.get(
  '/search',
  ...customerValidationSchemas.searchForCustomerSchema,
  validationMiddleware(),
  controller.searchForCustomer
);

export default router;
