import { DataTypes } from "sequelize";

export function defineClientes(sequelize) {
    const clientes = sequelize.define('clientes', {
        Documento: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Telefono: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return clientes;
}