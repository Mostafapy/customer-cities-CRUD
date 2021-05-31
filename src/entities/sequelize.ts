import { Sequelize } from 'sequelize-typescript';

// Import Models
import City from './city.entity';
import Customer from './customer.entity';

const sequelize: Sequelize = new Sequelize(
  process.env.DATABASE_DB_NAME || '',
  process.env.DATABASE_USER_NAME || '',
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || ''),
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      freezeTableName: false,
    },
    // models: [join(__dirname, './*.model.js')],
    logging: false,
  },
);

sequelize.addModels([
  City,
  Customer
]);
export default sequelize;
