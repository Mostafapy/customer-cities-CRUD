type CustomerDto = {
    name: string,
    cityId?: number
};

type City = {
   id: number,
   name: string
}

interface IEditCustomer {
    id: number,
    name: string,
    cityId?: number
}

interface IListCustomer {
    name: string,
    city: City
}

export {
    CustomerDto,
    IEditCustomer,
    IListCustomer
};
