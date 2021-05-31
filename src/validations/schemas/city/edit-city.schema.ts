import { body, param } from 'express-validator';

const editCitySchema = [
    param('id').exists().toInt().isNumeric(),
    body('name').exists().isString().isLength({ max: 50 })
];

export default editCitySchema;
