import { body, param } from 'express-validator';

const editCustomerSchema = [
    param('id').exists().toInt().isNumeric(),
    body('name').exists().isString().isLength({ max: 50 }),
    body('cityId').optional().isNumeric()
];

export default editCustomerSchema;
