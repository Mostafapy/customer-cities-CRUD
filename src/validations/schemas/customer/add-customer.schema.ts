import { body } from 'express-validator';

const addCustomerSchema = [
    body('name').isString().isLength({ max: 50 }),
    body('cityId').optional().isNumeric()
];

export default addCustomerSchema;
