import express from "express";
import { addToCart, getCart, removeFromCart, getTotal, storeProductsInOrder, removeFromCartAll } from "../services/shopping.service.js";
import { indexct } from "../services/categorias.service.js";
import { createcl } from "../services/clientes.service.js";
import { createpe } from "../services/pedido.service.js";
import { showcl } from "../services/clientes.service.js";
import Joi from 'joi';
export const shoppingViewsRouter = express.Router();

const validacioncliente = Joi.object({
    Documento: Joi.string().pattern(/^\d{7,10}$/).required().messages({
        'string.empty': 'El documento es obligatorio.',
        'string.pattern.base': 'El documento debe tener entre 7 y 10 dígitos.',
    }),
    Nombre: Joi.string().min(1).required().messages({
        'string.empty': 'El nombre es obligatorio.',
        'string.min': 'El nombre no puede estar vacío.',
    }),
    Apellido: Joi.string().min(1).required().messages({
        'string.empty': 'El apellido es obligatorio.',
        'string.min': 'El apellido no puede estar vacío.',
    }),
    Direccion: Joi.string().pattern(/#/).required().messages({
        'string.empty': 'La dirección es obligatoria.',
        'string.pattern.base': 'La dirección debe contener un "#".',
    }),
    Telefono: Joi.string().pattern(/^\d{10,}$/).required().messages({
        'string.empty': 'El teléfono es obligatorio.',
        'string.pattern.base': 'El teléfono debe tener al menos 10 dígitos.',
    }),
});



shoppingViewsRouter.get("/", async (req, res) => {
    let categorias = await indexct();
    const modelos = await getCart();
    const total = await getTotal();
    res.render('shop/shopping', { modelos, total, categorias, error: '' });
});

shoppingViewsRouter.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    await addToCart(id);
    res.status(200).json({ OK: "True" });
});

shoppingViewsRouter.post("/remove/:id", async (req, res) => {
    const { id } = req.params;
    await removeFromCart(id);
    res.redirect('/shopping-cart');
});

shoppingViewsRouter.post("/validate", async (req, res) => {
    try {
        // Validar el cuerpo de la solicitud con Joi
        const { error } = validacioncliente.validate(req.body);
        if (error) {
            // Si hay un error de validación, devolver el mensaje de error
            return res.status(200).json({
                error: error.details[0].message // Error de validación
            });
        }

        // Si no hay errores de validación, devolver un mensaje vacío (validación exitosa)
        res.status(200).json({});
    } catch (err) {
        console.error('Error al validar los datos:', err);
        res.status(500).json({ mensaje: 'Error en el servidor al validar los datos.' });
    }
});

shoppingViewsRouter.post("/", async (req, res) => {
    try {
        const { Documento, Nombre, Apellido, Direccion, Telefono } = req.body;

        // Verificar si el cliente ya existe
        let cliente = await showcl(Documento); // showcl debe buscar en la base de datos
        if (!cliente) {
            // Crear cliente si no existe
            cliente = await createcl({ Documento, Nombre, Apellido, Direccion, Telefono });

            // Confirmar que el cliente fue creado
            cliente = await showcl(Documento);
            if (!cliente) {
                throw new Error('Error al crear el cliente. Intenta nuevamente.');
            }
        }

        // Obtener el total y crear un pedido
        const Total = await getTotal();
        const pedido = await createpe({ Documento, Total });

        // Almacenar los productos en el pedido y vaciar el carrito
        await storeProductsInOrder(pedido.id);
        await removeFromCartAll();

        // Redirigir al carrito de compras
        res.redirect('/shopping-cart');
    } catch (err) {
        console.error('Error al procesar el pedido:', err);
        res.status(500).json({ mensaje: 'Error en el servidor al procesar el pedido.', detalle: err.message });
    }
})




