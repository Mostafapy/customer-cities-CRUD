import { body } from 'express-validator';

const addCitySchema = [
    body('name').exists().isString().isLength({ max: 50 })
];

export default addCitySchema;
