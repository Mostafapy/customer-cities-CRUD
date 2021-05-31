import { param } from 'express-validator';

const deleteCustomerByIdSchema = [
    param('id').exists().toInt().isNumeric(),
];

export default deleteCustomerByIdSchema;
