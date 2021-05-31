import * as CustomerDtos from '../dtos/customer.dto';
import { Request, RequestHandler, Response } from 'express';
import * as customerService from '../services/customer.service';

// [POST] /api/v1/customer/
const addCustomer: RequestHandler = async (req: Request, res: Response) => {
  const { name }: CustomerDtos.CustomerDto = req.body;

  const response = await customerService.addCustomer(name);

  return res.status(response.statusCode).json(response.body);
};

// [PUT] /api/v1/customer/:id
const editCustomer: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name }: CustomerDtos.CustomerDto = req.body;

  const response = await customerService.editCustomer({
    id: parseInt(id),
    name,
  });

  return res.status(response.statusCode).json(response.body);
};

// [GET] /api/v1/customer?id=
const findCustomerById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const response = await customerService.findCustomerById(parseInt(id));

  return res.status(response.statusCode).json(response.body);
};

// [DELETE] /api/v1/customer?id=
const deleteCustomerById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const response = await customerService.findCustomerById(parseInt(id));

  return res.status(response.statusCode).json(response.body);
};

// [GET] /api/v1/customer/search?name=
const searchForCustomer: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name } = req.query;

  const requiredName = name?.toString() || '';

  const response = await customerService.searchForCustomer(requiredName);

  return res.status(response.statusCode).json(response.body);
};

export {
  addCustomer,
  editCustomer,
  findCustomerById,
  deleteCustomerById,
  searchForCustomer,
};
