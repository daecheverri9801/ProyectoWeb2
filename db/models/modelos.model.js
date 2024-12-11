import { DataTypes } from "sequelize";

export function defineModelos(sequelize) {
    const modelos = sequelize.define('modelos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Patreon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Tipo_Modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Pelicula: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Nombre_Modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Medida: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Escala: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
    return modelos;
}