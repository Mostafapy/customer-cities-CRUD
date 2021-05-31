import { Router } from 'express';
import * as controller from '../controllers/city.controller';

// [USE] /api/v1/city
const router: Router = Router();

router.post('/', controller.addCity);

router.put('/:id', controller.editCity);

router.get('/:id', controller.findCityById);

router.delete('/:id', controller.deleteCityById);

export default router;

