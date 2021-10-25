const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')

//Controller
const UserController = require('../Controllers/UserController')

router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/', isAuthenticated, UserController.view)
router.delete('/', isAuthenticated, UserController.delete)

module.exports = router