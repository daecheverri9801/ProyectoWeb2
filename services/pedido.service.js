import { sequelize } from '../libs/sequelize.js';

async function createpe(pedido) {
    const newPedido = await sequelize.models.pedidos.create({
        Documento: pedido.Documento,
        Total: pedido.Total
    });
    return newPedido;
}

async function getAllPedidos() {
    try {
        // Consulta todos los pedidos con sus relaciones
        const pedidos = await sequelize.models.pedidos.findAll({
            include: [
                {
                    model: sequelize.models.clientes
                },
                {
                    model: sequelize.models.pedido_producto,      // Incluir los productos asociados al pedido
                    include: [
                        {
                            model: sequelize.models.modelos,   // Incluir los modelos asociados a cada producto
                        }
                    ]
                }
            ],
            order: [['id', 'ASC']]
        });

        // Mostrar los pedidos con sus relaciones
        console.log(JSON.stringify(pedidos, null, 2));
        return pedidos;
    } catch (error) {
        console.error("Error al obtener los pedidos con relaciones:", error);
    }
}


export { createpe, getAllPedidos };