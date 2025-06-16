import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import { UserRole } from 'src/core/types/user.enums';
import { UserTypes } from 'src/core/types/user.types';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  declare passwordHash: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
    defaultValue: UserRole.User,
  })
  declare role: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare username: string;
}
