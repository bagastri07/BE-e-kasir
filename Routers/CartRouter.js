const express = require('express')
const isAuthenticated = require('../Middlewares/isAuthenticated')
const router = express.Router()

const CartController = require('../Controllers/CartController')

router.get('/add/:id', isAuthenticated, CartController.addProductView)
router.post('/:id', isAuthenticated, CartController.Create)

module.exports = router