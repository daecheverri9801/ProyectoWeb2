import express from 'express';
import 'dotenv/config';
import { routerModelos } from './routes/index.js';
import nodemon from 'nodemon';
import { configurePassport } from './config/passport.js';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
configurePassport(app);

routerModelos(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
