import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/entities/user.entitys";


@Table({tableName : "posts"})
export class Posts extends Model{
    @Column({
        type : DataType.STRING,
    })
    declare body : string

    @ForeignKey(() => User)
    @Column({
        type :DataType.INTEGER
    })
    declare userId : number

    @BelongsTo(() => User)
    declare user : User[]

}