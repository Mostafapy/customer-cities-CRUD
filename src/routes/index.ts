import { Router } from 'express';
import cityRouter from './city.route';
import customerRouter from './customer.route';

// [USE] /
const router: Router = Router();

router.use('/api/v1/city', cityRouter);

router.use('/api/v1/customer', customerRouter);

export default router;
