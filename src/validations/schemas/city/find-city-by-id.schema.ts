import { param } from 'express-validator';

const findCityByIdSchema = [
    param('id').exists().toInt().isNumeric(),
];

export default findCityByIdSchema;
