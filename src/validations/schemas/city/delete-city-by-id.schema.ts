import { param } from 'express-validator';

const deleteCityByIdSchema = [
    param('id').exists().toInt().isNumeric(),
];

export default deleteCityByIdSchema;
