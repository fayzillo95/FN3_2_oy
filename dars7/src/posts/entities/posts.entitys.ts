import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/entities/user.entitys";


@Table({tableName : "posts"})
export class Posts extends Model{
    @Column({
        type : DataType.STRING,
    })
    body : string

    @ForeignKey(() => User)
    @Column({
        type :DataType.INTEGER
    })
    userId : User

    @BelongsTo(() => User)
    user : User[]

}