const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')
const isAlreadyLogin = require('../Middlewares/isAlreadyLogin')

//Controller
const BasicController = require('../Controllers/BasicController')

router.get('/', isAlreadyLogin, BasicController.login)
router.get('/register', isAlreadyLogin, BasicController.register)
router.get('/dashboard', isAuthenticated, BasicController.dashboard)

module.exports = router