import express from "express";
import { indexct } from "../services/categorias.service.js";
export const menuRouter = express.Router();

menuRouter.get("/", async (req, res) => {
    let categorias = await indexct();
    res.render('index', { categorias });
})

menuRouter.get("/aboutus", async (req, res) => {
    let categorias = await indexct();
    res.render('aboutus', { categorias });
})