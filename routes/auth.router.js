import express from "express";
import passport from "passport";
import { indexct } from "../services/categorias.service.js";
export const authRouter = express.Router();

authRouter.get("/login", async (req, res) => {
    let categorias = await indexct();
    res.render("auth/login", { categorias });
})

authRouter.post("/login", passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth/login',
}))

authRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
})