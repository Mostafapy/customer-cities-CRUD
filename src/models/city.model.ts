import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Sequelize,
    CreatedAt,
    UpdatedAt,
    HasMany,
  } from 'sequelize-typescript';
import Customer from './customer.model';
  
  @Table({ tableName: 'cities' })
  class City extends Model<City> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;
  
    @AllowNull(false)
    @Column({ type: DataType.STRING(50) })
    public name: string;
  
    @CreatedAt
    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
    public createdAt: string;
  
    @UpdatedAt
    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
    public updatedAt: string;
    
    @HasMany(() => Customer, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    customers: Customer[];
  }
  
  export default City;
