import { query } from 'express-validator';

const searchForCitySchema = [
    query('name').exists().isString().isLength({ max: 50 })
];

export default searchForCitySchema;
