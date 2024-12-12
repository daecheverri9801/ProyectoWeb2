import { DataTypes } from "sequelize";

export function defineCategorias(sequelize) {
    const cat = sequelize.define('Categorias', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    // cat.sync({ alter: true });
}