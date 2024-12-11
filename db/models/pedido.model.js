import { DataTypes } from "sequelize";

export function definePedidos(sequelize) {
    const Pedidos = sequelize.define('pedidos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Documento: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        Total: {
            type: DataTypes.INTEGER,
        }
    })
    // Pedidos.sync({ alter: true });
    return Pedidos;
}