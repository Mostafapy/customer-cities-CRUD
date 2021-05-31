import * as CityDtos from '../dtos/city.dtos';
import { Request, RequestHandler, Response } from 'express';
import * as cityService from '../services/city.service';

// [POST] /api/v1/city/
const addCity: RequestHandler = async (req: Request, res: Response) => {
      const { name }: CityDtos.CityDto = req.body;

     const response = await cityService.addCity(name);

     return res.status(response.statusCode).json(response.body);
};

// [PUT] /api/v1/city/:id
const editCity: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name }: CityDtos.CityDto = req.body;

   const response = await cityService.editCity({ id: parseInt(id), name });

   return res.status(response.statusCode).json(response.body);
};

// [GET] /api/v1/city/:id=
const findCityById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await cityService.findCityById(parseInt(id));

    return res.status(response.statusCode).json(response.body);
};

// [DELETE] /api/v1/city/:id
const deleteCityById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await cityService.findCityById(parseInt(id));

    return res.status(response.statusCode).json(response.body);
};

export {
    addCity,
    editCity,
    findCityById,
    deleteCityById
};
