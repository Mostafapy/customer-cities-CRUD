import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import * as controller from '../controllers/city.controller';
import * as cityValidationSchemas from '../validations/schemas/city/index';

// [USE] /api/v1/city
const router: Router = Router();

router.post(
  '/',
  ...cityValidationSchemas.addCitySchema,
  validationMiddleware(),
  controller.addCity
);

router.put(
  '/:id',
  validationMiddleware(),
  controller.editCity
);

router.get(
  '/:id',
  ...cityValidationSchemas.findCityByIdSchema,
  validationMiddleware(),
  controller.findCityById
);

router.delete(
  '/:id',
  ...cityValidationSchemas.deleteCityByIdSchema,
  validationMiddleware(),
  controller.deleteCityById
);

router.get(
  '/search',
  ...cityValidationSchemas.searchForCitySchema,
  validationMiddleware(),
  controller.searchForCity
);

export default router;
