import { DataTypes } from "sequelize";
import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Posts } from "./posts.model";

@Table({tableName : "users", timestamps : false})
export class User extends Model{
    @Column({
        type : DataType.STRING,
        unique : true
    })
    username : string
    @Column({
        type : DataTypes.STRING,
    })
    full_name : string

    @Column({
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 1
    })
    age : number
    
    @HasMany(() => Posts)
    posts : Posts
}
