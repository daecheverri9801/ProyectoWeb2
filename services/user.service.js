import { sequelize } from '../libs/sequelize.js';

async function indexusr() {
    const user = await sequelize.models.user.findAll();
    return user;
}

async function createusr(user) {
    const newuser = await sequelize.models.user.create({
        username: user.username,
        password: user.password,
    });
    return newuser;
}

async function showusr(id) {
    const user = await sequelize.models.user.findByPk(id);
    return user;
}

async function updateusr(id, user) {
    const searchuser = await sequelize.models.user.findByPk(id)
    if (!searchuser) {
        return false;
    }
    const [rowsAffected, [updateduser]] = await sequelize.models.user.update({
        username: user.username,
        password: user.password,
    }, {
        where: { id },
        returning: true
    })
    return updateduser;
}

async function destroyusr(id) {
    const deleteduser = await sequelize.models.user.findByPk(id);
    if (!deleteduser) {
        return null;
    }
    await deleteduser.destroy();
    return deleteduser;
}

export { indexusr, createusr, showusr, updateusr, destroyusr };