import { DataTypes } from "sequelize";

export function defineCategorias(sequelize) {
    sequelize.define('Categorias', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
}