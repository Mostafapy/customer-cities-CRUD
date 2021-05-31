import { query } from 'express-validator';

const searchForCustomerSchema = [
    query('name').exists().isString().isLength({ max: 50 })
];

export default searchForCustomerSchema;
