const express = require('express')
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload } = require('../controller/recipe')
const verifyToken = require('../middleware/auth')
const router= express.Router()

router.get("/",getRecipes)
router.get("/:id",getRecipe)
router.post("/",upload.single("file"),verifyToken,addRecipe)
router.put("/:id",editRecipe)
router.delete("/:id",deleteRecipe) 

module.exports = router