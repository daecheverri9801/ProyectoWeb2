import { sequelize } from '../libs/sequelize.js';

async function index(filter = {}) {
    const modelos = await sequelize.models.modelos.findAll({
        where: filter,
        order: [['id', 'ASC']],
    });
    return modelos;
}

async function create(model) {
    const newModel = await sequelize.models.modelos.create({
        Patreon: model.Categoria,
        Tipo_Modelo: model.Tipo_Modelo,
        Pelicula: model.Pelicula,
        Nombre_Modelo: model.Nombre_Modelo,
        Medida: model.Medida,
        Escala: model.Escala,
        Precio: model.Precio
    });
    return newModel;
}

async function show(id) {
    const model = await sequelize.models.modelos.findByPk(id);
    return model;
}

async function update(id, model) {
    const searchmodel = await sequelize.models.modelos.findByPk(id)
    if (!searchmodel) {
        return false;
    }
    const [rowsAffected, [updatedModel]] = await sequelize.models.modelos.update({
        Patreon: model.Patreon,
        Tipo_Modelo: model.Tipo_Modelo,
        Pelicula: model.Pelicula,
        Nombre_Modelo: model.Nombre_Modelo,
        Medida: model.Medida,
        Escala: model.Escala,
        Precio: model.Precio
    }, {
        where: { id },
        returning: true
    })
    return updatedModel;
}

async function destroy(id) {
    const deletedmodel = await sequelize.models.modelos.findByPk(id);
    if (!deletedmodel) {
        return null;
    }
    await deletedmodel.destroy();
    return deletedmodel;
}

export { index, create, show, update, destroy };