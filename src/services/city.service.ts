import { EMessages } from '../enums/messages.enum';
import { ResponseDto } from '../dtos/response.dtos';
import City from '../entities/city.entity';
import { IEditCity, IListCity } from '../dtos/city.dtos';
import { Logger } from '../utils/logger.utils';
import Customer from '../entities/customer.entity';
import * as sharedService from './shared.service';

// initialize logger
const logger: Logger = new Logger('City Service');

/**
 * @DESC Service for adding city to DB
 * @param name string of input
 * @returns Promise | ERROR
*/
const addCity = async (name: string): Promise<ResponseDto<any>> => {
  try {
    // add new city
    const newCity = new City();

    newCity.name = name;

    newCity.save();

    logger.log('AddCity Service Msg: Successfully added new city');

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: newCity,
      },
      statusCode: 201,
    };
  } catch (err) {
    logger.error('AddCity Service Error', { err });

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

/**
 * @DESC Service for edit city to DB
 * @param body contians id of required to edit city
 * @returns Promise | ERROR
*/
const editCity = async (body: IEditCity): Promise<ResponseDto<IListCity>> => {
  try {
    const foundCity = await sharedService.checkFoundRecord(City, { where: { id: body.id } });

    await foundCity.update({ name: body.name });

    logger.log(`editCity Service Msg: Successfully update city of id ${body.id}`);

    const city = await sharedService.checkFoundRecord(City, body.id, {
      include: [
        {
          model: Customer,
          as: 'customers',
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: city?.id,
          name: city?.name,
          customers: city?.customers.map((customer: any) => {
            return {
              id: customer.id,
              name: customer.name,
            };
          }),
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

/**
 * @DESC Service for find the required city to DB
 * @param id id of required to find city
 * @returns Promise | ERROR
*/
const findCityById = async (id: number): Promise<ResponseDto<IListCity>> => {
  try {
    const foundCity = await sharedService.checkFoundRecord(City, { where: { id } }, {
      include: [
        {
          model: Customer,
          as: 'customers',
          attributes: ['id', 'name'],
        },
      ],
    });

    logger.log(`findCityById Service Msg: Successfully found city of id ${id}`);

    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: foundCity?.id,
          name: foundCity?.name,
          customers: foundCity?.customers.map((customer: any) => {
            return {
              id: customer.id,
              name: customer.name,
            };
          }),
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

/**
 * @DESC Service for delete the required city to DB
 * @param id id of required to delete city
 * @returns Promise | ERROR
*/
const deleteCityById = async (id: number): Promise<ResponseDto<any>> => {
  try {
    const foundCity = await sharedService.checkFoundRecord(City, { where: { id } });

    await foundCity.destroy();

    logger.log(`deleteCityById Service Msg: Successfully delete city of id ${id}`);

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

const searchForCity = async(name: string): Promise<ResponseDto<IListCity>> => {
   try {
    const foundCity = await sharedService.checkFoundRecord(City, { where: { name } }, {
      include: [
        {
          model: Customer,
          as: 'customers',
          attributes: ['id', 'name'],
        },
      ],
    });

    logger.log(`searchForCity Service Msg: Successfully found city of name ${name}`);
    
    return {
      body: {
        message: EMessages.done,
        success: true,
        data: {
          id: foundCity?.id,
          name: foundCity?.name,
          customers: foundCity?.customers.map((customer: any) => {
            return {
              id: customer.id,
              name: customer.name,
            };
          }),
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

export { addCity, editCity, findCityById, deleteCityById, searchForCity };
