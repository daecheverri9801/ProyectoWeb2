import { DataTypes } from "sequelize";

export function definePedidoProducto(sequelize) {
    const pedido_producto = sequelize.define('pedido_producto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_pedido: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        precio_unitario: {
            type: DataTypes.INTEGER,
        }
    })
    // pedido_producto.sync({ alter: true });
    return pedido_producto;
}