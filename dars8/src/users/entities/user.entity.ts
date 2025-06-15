import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
@Table({
    tableName : "users",
    timestamps : false
})
export class User extends Model{
    @Column({
        type : DataTypes.STRING
    })
    declare username : string

    @Column({
        type : DataTypes.STRING
    })
    declare password : string
}
