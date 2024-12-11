import { sequelize } from '../libs/sequelize.js';

async function createpp(pedido_producto) {
    const newPedido_Producto = await sequelize.models.pedido_producto.create({
        id_pedido: pedido_producto.id_pedido,
        id_producto: pedido_producto.id_producto,
        precio_unitario: pedido_producto.precio_unitario
    });
    return newPedido_Producto;
}

export { createpp };