import express from "express";
import { index } from "../services/modelos.service.js";
import { indexct } from "../services/categorias.service.js";
import { getCart } from "../services/shopping.service.js";
export const modelosViewsRouter = express.Router();

modelosViewsRouter.get("/", async (req, res) => {
    const { patreon } = req.query;
    let modelos;
    let categorias = await indexct();
    if (patreon) {
        modelos = await index({ Patreon: patreon });
    } else {
        modelos = await index();
    }
    let carrito = await getCart();
    res.render('models/modelos', { modelos, user: req.user, categorias, carrito });
});



// modelosViewsRouter.post("/", async (req, res) => {
//     console.log(req.body);
//     let { Patreon, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio } = req.body;
//     await create({ Patreon, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio });
//     res.redirect('models/modelos');
// })

// modelosViewsRouter.post("/edit/:id", async (req, res) => {
//     console.log(req.body);
//     const { id } = req.params;
//     let { Patreon, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio } = req.body;
//     await update(id, { Patreon, Tipo_Modelo, Pelicula, Nombre_Modelo, Medida, Escala, Precio });
//     res.redirect('/models/modelos');
// })

// modelosViewsRouter.post("/destroy/:id", async (req, res) => {
//     const { id } = req.params;
//     await destroy(id);
//     res.redirect('models/modelos');
// })