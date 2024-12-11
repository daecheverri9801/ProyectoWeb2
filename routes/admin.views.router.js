import express from "express";
import { index, create, update, destroy } from "../services/modelos.service.js";
import { indexusr, createusr, updateusr, destroyusr } from "../services/user.service.js";
import { indexct, createct, destroyct, updatect } from "../services/categorias.service.js";
import { getAllPedidos } from '../services/pedido.service.js';
export const adminViewsRouter = express.Router();
import Joi from 'joi';

// Definimos el esquema de validación con Joi
const validacionmodelos = Joi.object({
    Categoria: Joi.string(),
    Tipo_Modelo: Joi.string().valid('Escultura', 'Busto', 'Diorama').required().messages({
        'string.empty': 'El documento es obligatorio.',
        'any.only': 'El tipo de modelo debe ser uno de: Escultura, Busto, Diorama.',
    }),
    Pelicula: Joi.string(),
    Nombre_Modelo: Joi.string(),
    Medida: Joi.string().pattern(/^\d{3}mm$/).messages({
        'string.empty': 'La medida es obligatoria.',
        'string.pattern.base': 'La medida debe tener el formato XXXmm.',
    }),
    Escala: Joi.string().valid('1/6', '1/4').messages({
        'any.only': 'La escala debe ser 1/6 o 1/4.', // Mensaje para escala
    }),
    Precio: Joi.number().required().messages({
        'number.base': 'El precio debe ser un número.',
        'any.required': 'El precio es obligatorio.'
    })
});

adminViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
})

adminViewsRouter.get("/", async (req, res) => {
    res.render('admin/admin', { user: req.user });
})


adminViewsRouter.get("/products", async (req, res) => {
    let categorias = await indexct();
    const { patreon } = req.query;
    let modelos;
    if (patreon) {
        modelos = await index({ Patreon: patreon });
    } else {
        modelos = await index();
    }
    res.render('admin/products', { modelos, user: req.user, categorias, error: '' });
});

adminViewsRouter.post("/products", async (req, res) => {
    const { error } = validacionmodelos.validate(req.body);
    if (error) {
        // Si hay un error de validación, redirigimos con el mensaje de error
        return res.status(200).json({
            modelos: await index(),            // Recuperamos los modelos para mostrar en la vista
            error: error.details[0].message,   // Error de validación
            categorias: await indexct(),       // Recuperamos las categorías para mostrar en la vista
            user: req.user                     // Información del usuario autenticado
        });
    }
    let { Categoria, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio } = req.body;
    await create({ Categoria, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio });
    res.redirect('/admin/products');
})

adminViewsRouter.post("/products/edit/:id", async (req, res) => {
    const { id } = req.params;
    let { Patreon, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio } = req.body;
    await update(id, { Patreon, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio });
    res.redirect('/admin/products');
})

adminViewsRouter.post("/products/destroy/:id", async (req, res) => {
    const { id } = req.params;
    await destroy(id);
    res.redirect('/admin/products');
})





adminViewsRouter.get("/users", async (req, res) => {
    const users = await indexusr();
    res.render('admin/user', { users, user: req.user });
})

adminViewsRouter.post("/users", async (req, res) => { //formulario
    let { username, password } = req.body;
    await createusr({ username, password });
    res.redirect('/admin/users');
})

adminViewsRouter.post("/users/edit/:id", async (req, res) => {
    const { id } = req.params;
    let { username, password } = req.body;
    await updateusr(id, { username, password });
    res.redirect('/admin/users');
})

adminViewsRouter.post("/users/destroy/:id", async (req, res) => {
    const { id } = req.params;
    await destroyusr(id);
    res.redirect('/admin/users');
})





adminViewsRouter.get('/categorias', async (req, res) => {
    let categorias = await indexct();
    res.render('admin/categorias', { categorias, user: req.user });
});

adminViewsRouter.post('/categorias', async (req, res) => {
    let { categoria } = req.body;
    await createct({ categoria });
    res.redirect('/admin/categorias');
});

adminViewsRouter.post("/categorias/edit/:id", async (req, res) => {
    let { id } = req.params;
    let { categoria } = req.body;
    await updatect(id, { categoria });
    res.redirect('/admin/categorias');
})

adminViewsRouter.post('/categorias/destroy/:id', async (req, res) => {
    let { id } = req.params;
    await destroyct(id);
    res.redirect('/admin/categorias');
});



adminViewsRouter.get("/orders", async (req, res) => {
    let pedidos = await getAllPedidos();
    res.render('admin/orders', { pedidos, user: req.user });
})