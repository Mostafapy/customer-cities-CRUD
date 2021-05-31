import { Router } from 'express';
import * as controller from '../controllers/customer.controller';

// [USE] /api/v1/customer
const router: Router = Router();

router.post('/', controller.addCustomer);

router.put('/:id', controller.editCustomer);

router.get('/:id', controller.findCustomerById);

router.delete('/:id', controller.deleteCustomerById);

router.get('/search', controller.searchForCustomer);

export default router;
