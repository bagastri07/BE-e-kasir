const express = require('express')
const router = express.Router()
const isAuthenticated = require('../Middlewares/isAuthenticated')

//Controller
const NoteControllers = require('../Controllers/NoteControllers')

router.post('/', isAuthenticated, NoteControllers.create)
router.get('/add', isAuthenticated, NoteControllers.createPage)
router.get('/', isAuthenticated, NoteControllers.viewAll)
router.delete('/:id', isAuthenticated, NoteControllers.delete)
router.get('/:id', isAuthenticated, NoteControllers.view)

module.exports = router

