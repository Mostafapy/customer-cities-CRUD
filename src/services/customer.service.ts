import { EMessages } from '../enums/messages.enum';
import { ResponseDto } from '../dtos/response.dtos';
import { IEditCustomer, IListCustomer } from '../dtos/customer.dto';
import { Logger } from '../utils/logger.utils';
import Customer from '../models/customer.model';
import * as sharedService from './shared.service';
import City from '../models/city.model';

// initialize logger
const logger: Logger = new Logger('Customer Service');

/**
 * @DESC Service for adding customer to DB
 * @param name string of input
 * @returns Promise | ERROR
*/
const addCustomer = async (name: string): Promise<ResponseDto<any>> => {
  try {
    // add new Customer
    const newCustomer = new Customer();

    newCustomer.name = name;

    newCustomer.save();

    logger.log('AddCustomer Service Msg: Successfully added new Customer');

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: newCustomer,
      },
      statusCode: 201,
    };
  } catch (err) {
    logger.error('AddCustomer Service Error', { err });

    return {
      body: {
        message: EMessages.serverError,
        error: err.message,
        success: false,
        data: null,
      },
      statusCode: 500,
    };
  }
};

const editCustomer = async (body: IEditCustomer): Promise<ResponseDto<IListCustomer>> => {
  try {
    const foundCustomer = await sharedService.checkFoundRecordById(Customer, body.id);

    await foundCustomer.update({ name: body.name, cityId: body.cityId });

    const customer = await sharedService.checkFoundRecordById(Customer, body.id, {
      include: [
        {
          model: City,
          as: 'city',
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: customer?.id,
          name: customer?.name,
          city: customer?.city,
        },
      },
      statusCode: 200,
    };
  } catch (err) {
    if (err.message === `Record of id ${body.id} is not found`) {
      return {
        body: {
          message: EMessages.notFound,
          error: err.message,
          success: false,
          data: null,
        },
        statusCode: 404,
      };
    }

    return {
      body: {
        message: EMessages.serverError,
        error: err.message,
        success: false,
        data: null,
      },
      statusCode: 500,
    };
  }
};

const findCustomerById = async (id: number): Promise<ResponseDto<IListCustomer>> => {
  try {
    const foundCustomer = await sharedService.checkFoundRecordById(Customer, id, {
    include: [
        {
            model: City,
            as: 'city',
            attributes: ['id', 'name'],
        },
    ],
    });

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: foundCustomer?.id,
          name: foundCustomer?.name,
          city: foundCustomer?.city,
        },
      },
      statusCode: 200,
    };
  } catch (err) {
    if (err.message === `Record of id ${id} is not found`) {
      return {
        body: {
          message: EMessages.notFound,
          error: err.message,
          success: false,
          data: null,
        },
        statusCode: 404,
      };
    }

    return {
      body: {
        message: EMessages.serverError,
        error: err.message,
        success: false,
        data: null,
      },
      statusCode: 500,
    };
  }
};

const deleteCustomerById = async (id: number): Promise<ResponseDto<any>> => {
  try {
    const foundCustomer = await sharedService.checkFoundRecordById(Customer, id);

    await foundCustomer.destroy();

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: null,
      },
      statusCode: 201,
    };
  } catch (err) {
    if (err.message === `Record of id ${id} is not found`) {
      return {
        body: {
          message: EMessages.notFound,
          error: err.message,
          success: false,
          data: null,
        },
        statusCode: 404,
      };
    }

    return {
      body: {
        message: EMessages.serverError,
        error: err.message,
        success: false,
        data: null,
      },
      statusCode: 500,
    };
  }
};


export { addCustomer, editCustomer, findCustomerById, deleteCustomerById };
