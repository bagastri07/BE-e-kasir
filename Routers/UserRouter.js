const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')
const isAlreadyLogin = require('../Middlewares/isAlreadyLogin')

//Controller
const UserController = require('../Controllers/UserController')
const AuthController = require('../Controllers/AuthController')

router.post('/register', isAlreadyLogin, UserController.create)
router.post('/login', isAlreadyLogin, AuthController.login)
router.post('/logout', isAuthenticated, AuthController.logout)
router.get('/', isAuthenticated, UserController.view)
router.delete('/', isAuthenticated, UserController.delete)
router.get('/update', isAuthenticated, UserController.updateView)
router.put('/update', isAuthenticated, UserController.update)
module.exports = router