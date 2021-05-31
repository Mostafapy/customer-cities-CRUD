import { EMessages } from '../enums/messages.enum';
import { ResponseDto } from '../dtos/response.dtos';
import { IEditCustomer, IListCustomer } from '../dtos/customer.dto';
import { Logger } from '../utils/logger.utils';
import Customer from '../entities/customer.entity';
import * as sharedService from './shared.service';
import City from '../entities/city.entity';

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

const editCustomer = async (
  body: IEditCustomer
): Promise<ResponseDto<IListCustomer>> => {
  try {
    const foundCustomer = await sharedService.checkFoundRecord(Customer, {
      where: { id: body.id },
    });

    await foundCustomer.update({ name: body.name, cityId: body.cityId });

    const customer = await sharedService.checkFoundRecord(
      Customer,
      { where: { id: body.id } },
      {
        include: [
          {
            model: City,
            as: 'city',
            attributes: ['id', 'name'],
          },
        ],
      }
    );

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: customer?.id,
          name: customer?.name,
          city: customer?.city ? customer?.city : null,
        },
      },
      statusCode: 200,
    };
  } catch (err) {
    if (err.message === 'The requied record is not found') {
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

const findCustomerById = async (
  id: number
): Promise<ResponseDto<IListCustomer>> => {
  try {
    const foundCustomer = await sharedService.checkFoundRecord(
      Customer,
      { where: { id } },
      {
        include: [
          {
            model: City,
            as: 'city',
            attributes: ['id', 'name'],
          },
        ],
      }
    );

    logger.log(`findCustomerById Service Msg: Successfully found Customer of id ${id}`);

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: foundCustomer?.id,
          name: foundCustomer?.name,
          city: foundCustomer?.city ? foundCustomer?.city : null,
        },
      },
      statusCode: 200,
    };
  } catch (err) {
    if (err.message === 'The requied record is not found') {
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
    const foundCustomer = await sharedService.checkFoundRecord(Customer, {
      where: { id },
    });

    await foundCustomer.destroy();

    logger.log(`deleteCustomerById Service Msg: Successfully remove Customer of id ${id}`);

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: null,
      },
      statusCode: 200,
    };
  } catch (err) {
    if (err.message === 'The requied record is not found') {
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

const searchForCustomer = async(name: string): Promise<ResponseDto<IListCustomer>> => {
  try {
   const foundCustomer = await sharedService.checkFoundRecord(Customer, { where: { name } }, {
      include: [
        {
          model: City,
          as: 'city',
          attributes: ['id', 'name'],
        },
      ],
   });

   logger.log(`searchForCustomer Service Msg: Successfully found customer of name ${name}`);
   
   return {
     body: {
       message: EMessages.done,
       success: true,
       data: {
        id: foundCustomer?.id,
        name: foundCustomer?.name,
        city: foundCustomer?.city ? foundCustomer?.city : null,
       },
     },
     statusCode: 200,
   };
   
  } catch (err) {
   if (err.message === 'The requied record is not found') {
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

export { addCustomer, editCustomer, findCustomerById, deleteCustomerById, searchForCustomer };
