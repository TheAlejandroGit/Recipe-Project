const router = require('express').Router()
const passport = require('passport')

const recipeServices = require('./recipes.services')
require('../middleware/auth.middleware')(passport)



//? /recipes 
//? /recipes/:recipe_id

router.route('/')
    .get(recipeServices.getAll)
    .post(
        passport.authenticate('jwt', {session: false}),
        recipeServices.createRecipe
    )

router.route('/:recipe_id')
    .get(recipeServices.getById)
    .patch(
        passport.authenticate('jwt', {session: false}),
        recipeServices.patchRecipe
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        recipeServices.deleteById
    )

module.exports = router