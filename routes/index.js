import express from "express";
import { modelosViewsRouter } from "./modelos.views.router.js";
import { authRouter } from "./auth.router.js";
import { menuRouter } from "./menu.js";
import { adminViewsRouter } from "./admin.views.router.js";
import { shoppingViewsRouter } from "./shopping.views.router.js";

const router = express.Router();

export function routerModelos(app) {
    app.use("/", router)

    router.use("/", menuRouter);
    router.use("/modelos", modelosViewsRouter);
    router.use("/auth", authRouter);
    router.use("/admin", adminViewsRouter);
    router.use("/shopping-cart", shoppingViewsRouter)
}