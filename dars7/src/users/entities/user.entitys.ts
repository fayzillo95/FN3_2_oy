import { DataTypes } from "sequelize";
import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Posts } from "../../posts/entities/posts.entitys";

@Table({tableName : "users", timestamps : false})
export class User extends Model{
    @Column({
        type : DataType.STRING
    })
    declare username : string
    @Column({
        type : DataTypes.STRING,
    })
    declare first_name : string
 
    @Column({
        type :DataTypes.STRING
    })
    declare last_name : string

    @Column({
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 1
    })
    declare age : number

    @HasMany(() => Posts)
    posts : Posts[]
}
