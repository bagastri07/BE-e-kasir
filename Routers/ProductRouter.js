const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')

//Controller
const productController = require('../Controllers/ProductController')

router.post('/', isAuthenticated, productController.create)
router.get('/', isAuthenticated, productController.viewAll)
router.delete('/:id', isAuthenticated, productController.delete)

module.exports = router

