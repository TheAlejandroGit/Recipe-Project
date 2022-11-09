const TypesIngredients = require('../models/types_ingredients.models')



const getAllTypes = async () => {
    const data = await TypesIngredients.findAll()
    return data
}

const getTypeById = async (id) => {
    const data = await TypesIngredients.findOne({
        where: {
            id
        }
    })
    return data
}

const createType = async (name) => {
    const data = await TypesIngredients.create({
        name
    })
    return data
}

const deleteType = async (id) => {
    const data = await TypesIngredients.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllTypes,
    getTypeById,
    createType,
    deleteType
}