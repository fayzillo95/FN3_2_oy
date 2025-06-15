import { DataTypes } from "sequelize";
import { Column } from "sequelize-typescript";

export class CreatePostDto {
    @Column({
        type : DataTypes.STRING,
        allowNull : false
    })
    body : string
}


// $ npm install --save sequelize sequelize-typescript postgres pg pg-hstore 
// $ npm install --save-dev @types/sequelize