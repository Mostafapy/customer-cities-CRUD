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
} from 'sequelize-typescript';
import City from './city.entity';

// const custmorNameIndex = createIndexDecorator({ name: 'CUSTOMERNAMEINDEX', unique: true });

@Table({
  tableName: 'customers',
  indexes: [
    {
      unique: true,
      fields: ['name'],
    },
  ],
})
class Customer extends Model<Customer> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(50) })
  public name: string;

  @CreatedAt
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  public createdAt: string;

  @UpdatedAt
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  public updatedAt: string;

  @AllowNull(false)
  @ForeignKey(() => City)
  @Column
  public cityId: number;

  @BelongsTo(() => City, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  city: City;
}

export default Customer;
