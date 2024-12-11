import { sequelize } from '../libs/sequelize.js';

async function indexcl(filter = {}) {
    const clientes = await sequelize.models.clientes.findAll({
        where: filter,
    });
    return clientes;
}

async function createcl(client) {
    const newClient = await sequelize.models.clientes.create({
        Documento: client.Documento,
        Nombre: client.Nombre,
        Apellido: client.Apellido,
        Direccion: client.Direccion,
        Telefono: client.Telefono
    });
    return newClient;
}

async function showcl(id) {
    const client = await sequelize.models.clientes.findByPk(id);
    return client;
}

async function updatecl(id, client) {
    const searchclient = await sequelize.models.clientes.findByPk(id)
    if (!searchclient) {
        return false;
    }
    const [rowsAffected, [updatedclient]] = await sequelize.models.clientes.update({
        Documento: client.Documento,
        Nombre: client.Nombre,
        Apellido: client.Apellido,
        Direccion: client.Direccion,
        Telefono: client.Telefono
    }, {
        where: { id },
        returning: true
    })
    return updatedclient;
}

async function destroycl(id) {
    const deletedclient = await sequelize.models.clientes.findByPk(id);
    if (!deletedclient) {
        return null;
    }
    await deletedclient.destroy();
    return deletedclient;
}

export { indexcl, createcl, showcl, updatecl, destroycl };