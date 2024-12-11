import { sequelize } from '../libs/sequelize.js';
import { createpp } from './pedido_producto.service.js';

let carrito = []; // Esto es temporal, podrías usar una base de datos o sesiones para persistir el carrito

async function addToCart(modelId) {
    const model = await sequelize.models.modelos.findByPk(modelId);
    if (model) {
        carrito.push(model);
    }
}

async function getCart() {
    return carrito;  // Devuelve los modelos que están en el carrito
}

async function removeFromCart(modelId) {
    carrito = carrito.filter(item => item.id != modelId); // Elimina el modelo del carrito
}

async function removeFromCartAll() {
    carrito = [];
}

async function getTotal() {
    return carrito.reduce((total, modelo) => total + modelo.Precio, 0);  // Suma los precios de los modelos en el carrito
}

// Función para almacenar los productos en la tabla pedido_producto
async function storeProductsInOrder(id_pedido) {
    // Obtener los productos del carrito
    const carrito = await getCart(); // Suponemos que getCart() ya está definida

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];

        // Crear un nuevo registro en la tabla pedido_producto
        try {
            await createpp({
                id_producto: producto.id,      // ID del producto en el carrito
                id_pedido: id_pedido,                  // Aquí deberías pasar el ID del pedido correspondiente (ajustalo a tu lógica)
                precio_unitario: producto.Precio, // Suponiendo que cada producto tiene un campo "precio"
            });
            console.log(`Producto ${producto.id} agregado al pedido`);
        } catch (error) {
            console.error('Error al agregar producto al pedido:', error);
        }
    }
}


export { addToCart, getCart, removeFromCart, getTotal, storeProductsInOrder, removeFromCartAll };
