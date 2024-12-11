import { defineModelos } from "./modelos.model.js";
import { defineUsers } from "./user.model.js";
import { defineClientes } from "./clientes.model.js";
import { definePedidos } from "./pedido.model.js";
import { definePedidoProducto } from "./pedido_producto.model.js";
import { defineCategorias } from "./categorias.model.js";

export function defineModels(sequelize) {
    const Modelos = defineModelos(sequelize);
    defineUsers(sequelize);
    const Clientes = defineClientes(sequelize);
    const Pedidos = definePedidos(sequelize);
    const PedidoProducto = definePedidoProducto(sequelize);
    defineCategorias(sequelize);

    // Relaciones
    Pedidos.hasMany(PedidoProducto, { foreignKey: 'id_pedido' }); // Un pedido puede tener varios productos
    PedidoProducto.belongsTo(Pedidos, { foreignKey: 'id_pedido' }); // Cada producto está asociado a un único pedido

    // Relación entre 'modelos' y 'pedido_producto' (uno a muchos)
    Modelos.hasMany(PedidoProducto, { foreignKey: 'id_producto' }); // Un modelo puede estar en varios productos
    PedidoProducto.belongsTo(Modelos, { foreignKey: 'id_producto' }); // Cada producto tiene un modelo

    Clientes.hasMany(Pedidos, { foreignKey: 'Documento' }); // Un cliente puede tener varios pedidos
    Pedidos.belongsTo(Clientes, { foreignKey: 'Documento' }); // Cada pedido pertenece a un cliente

}