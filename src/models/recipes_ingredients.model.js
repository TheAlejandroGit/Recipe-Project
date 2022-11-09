//Tipos de datos de Sequelize
const {DataTypes} = require('sequelize')
//Base de Datos
const db = require('../utils/database')
//Tablas
const Ingredients = require('./ingredients.models')
const Recipes = require('./recipes.models')

const RecipesIngredients = db.define('recipes_ingredients', {
    id : {
        primaryKey: true, 
        type: DataTypes.UUID,
        allowNull: false
    },
    amount : {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredientId:{
        type: DataTypes.UUID,
        allowNull: false,
        field: 'ingredient_id',
        references:{
            key: 'id',
            model: Ingredients
        }
    },
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'recipe_id',
        references:{
            key: 'id',
            model: Recipes
        }
    }
})


module.exports = RecipesIngredients