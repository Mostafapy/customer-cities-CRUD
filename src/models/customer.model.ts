import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Sequelize,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    createIndexDecorator,
  } from 'sequelize-typescript';
import City from './city.model';
  
const custmorNameIndex = createIndexDecorator({ name: 'CUSTOMERNAMEINDEX', unique: true });

  @Table({ tableName: 'customers' })
  class Customer extends Model<Customer> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;
  
    @AllowNull(false)
    @Column({ type: DataType.STRING(50) })
    @custmorNameIndex
    public name: string;
  
    @CreatedAt
    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
    public createdAt: string;
  
    @UpdatedAt
    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
    public updatedAt: string;

    @AllowNull(false)
    @ForeignKey(() => City)
    @Column
    public cityId: number;

    @BelongsTo(() => City, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    city: City;
  }
  
  export default Customer;
