const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')

//Controller
const InvoiceControllers = require('../Controllers/InvoiceControllers')

router.get('/', isAuthenticated, InvoiceControllers.view)
router.get('/add', isAuthenticated, InvoiceControllers.createPage)

module.exports = router

