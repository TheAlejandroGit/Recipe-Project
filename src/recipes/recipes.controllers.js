const uuid = require("uuid");
const { Op } = require('sequelize')

const Recipes = require("../models/recipes.models");
const Users = require('../models/users.models')
const CategoriesRecipes = require('../models/categories_recipes.model')
const Instructions = require('../models/instructions.model')
const Ingredients = require('../models/ingredients.models')
const TypesIngredients = require('../models/types_ingredients.models')
const RecipeIngredients = require('../models/recipes_ingredients.model')
const UsersIngredients = require('../models/users_ingredients.models')

const getAllRecipes = async () => {
  const data = await Recipes.findAll({
    attributes: {
      exclude: ['userId', 'categoriesRecipeId', 'createdAt', 'updatedAt']
    },
    include: [
      {
        model: CategoriesRecipes,
      },
      {
        model: Users,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Instructions
      },
      {
        model: RecipeIngredients,
        include:{
          model: Ingredients,
          include: {
            model: TypesIngredients
          }
        }
      }
    ]
  });
  return data;
};

const getRecipeById = async (id) => {
  const data = await Recipes.findOne({
    where: {
      id,
    },
  });
  return data;
};

const createRecipe = async (data, userId) => {
  const newRecipe = {
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    urlImg: data.urlImg,
    urlVideo: data.urlVideo,
    preparationTime: data.preparationTime,
    portions: data.portions,
    userId: userId,
    categoriesRecipeId: data.categoriesRecipeId,
    origin: data.origin,
  };
  const response = await Recipes.create(newRecipe);
  return response;
};

const deleteRecipeById = async (id) => {
  const data = await Recipes.destroy({
    where: {
      id,
    },
  });
  return data;
};

const updateRecipeById = async (id, data) => {
  const result = await Recipes.update(data, {
    where: {
      id,
    },
  });
  return result;
};

const getMyRecipes = async (userId) => {
  const userIngredients = await UsersIngredients.findAll({
    attributes: ['ingredientId'],
    where: {
      userId
    }
  })
  const filteredIngredients = userIngredients.map(obj => obj.ingredientId)

  const recipeIngredients = await RecipeIngredients.findAll({
    where: {
      ingredientId:{
        [Op.in]: filteredIngredients 
      }
    }
  })
  
  const filteredRecipes = recipeIngredients.map(obj => obj.recipeId)
  
  const data = await Recipes.findAll({
    where:{
      id:{
        [Op.in]: filteredRecipes
      }
    }
  })
  return data
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipeById,
    updateRecipeById,
    getMyRecipes
}
