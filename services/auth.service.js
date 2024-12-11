import { sequelize } from '../libs/sequelize.js';

async function signup(username, password) {
    const User = await sequelize.models.user.create({
        username,
        password
    });
    return User;
}

export { signup };