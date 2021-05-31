import { param } from 'express-validator';

const findCustomerByIdSchema = [
    param('id').exists().toInt().isNumeric(),
];

export default findCustomerByIdSchema;
