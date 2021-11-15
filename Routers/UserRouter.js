const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')
const isAlreadyLogin = require('../Middlewares/isAlreadyLogin')

//Controller
const UserController = require('../Controllers/UserController')

router.post('/register', isAlreadyLogin, UserController.create)
router.post('/login', isAlreadyLogin, UserController.login)
router.post('/logout', isAuthenticated, UserController.logout)
router.get('/', isAuthenticated, UserController.view)
router.delete('/', isAuthenticated, UserController.delete)

module.exports = router