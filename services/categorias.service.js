import { sequelize } from '../libs/sequelize.js';

async function indexct() {
    const categorias = await sequelize.models.Categorias.findAll({
        order: [
            ['id', 'ASC'],  // Ordenar por el campo 'id' en orden ascendente
        ]
    });
    return categorias;
}

async function createct(data) {
    const newCategoria = await sequelize.models.Categorias.create(data);
    return newCategoria;
}

async function updatect(id, model) {
    const searchcategoria = await sequelize.models.Categorias.findByPk(id)
    if (!searchcategoria) {
        return false;
    }
    const [rowsAffected, [updatedCategoria]] = await sequelize.models.Categorias.update({
        categoria: model.categoria
    }, {
        where: { id },
        returning: true
    })
    return updatedCategoria;
}

async function destroyct(id) {
    const categoria = await sequelize.models.Categorias.findByPk(id);
    if (!categoria) return null;
    await categoria.destroy();
    return categoria;
}

export { indexct, createct, updatect, destroyct };
