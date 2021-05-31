type CityDto = {
    name: string
};

type Users = {
    id: number
    name: string
}

interface IEditCity {
    id: number,
    name: string
}

interface IListCity {
  id: number,
  name: string,
  customers: Users[],
}

export {
    CityDto,
    IEditCity,
    IListCity,
};
