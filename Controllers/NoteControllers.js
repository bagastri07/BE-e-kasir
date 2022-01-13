const Note = require('../Models/NoteSchema')
const Cart = require('../Models/CartSchema')
const response = require('../_helpers/response')
const formatDate = require('../_helpers/formatDate')
const formatRupiah = require('../_helpers/formatRupiah')

const NotesControllers = {
    view: (req, res) => {
        Note.findOne({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 400, false, 'Not found')

            res.render('Pages/invoice', {
                note: doc,
                formatDate: formatDate,
                formatRupiah: formatRupiah,
                penjual: req.user.name
            })
        })
        
    },
    createPage: (req, res) => {
        res.render('Pages/invoice')
    },
    viewAll: (req, res) => {
        Note.find({user : req.user._id}).exec((err, doc) => {
            res.render('Pages/listNota', {
                notes: doc,
                formatDate: formatDate,
                formatRupiah: formatRupiah
            })
        })
    },
    create: async (req, res) => {
        const cartData = await Cart.find({user: req.user._id}).populate('product')

        if (cartData.length === 0) return response(res, 400, false, 'Not found')
        
        const products = []
        let total = 0

        cartData.forEach(element => {
            productTemp = {
                name: element.product.name,
                quantity: element.quantity,
                price: element.price,
                subTotal: element.total
            }
            total = total + element.total
            products.push(productTemp)
        });

        let dateNow = new Date()
        let dateString = dateNow.toISOString()

        const noteData = {
            products: products,
            date : dateString,
            user: req.user._id,
            total: total
        }

        newNote = new Note(noteData)
        saveNote = await newNote.save()

        await Cart.deleteMany({user: req.user._id})

        res.redirect('/invoice/' + saveNote.id)
    },
    delete: (req, res) => {
        Note.findOneAndDelete({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 400, false, 'Not found')

            req.flash('info', 'Nota berhasil dihapus')
            res.redirect('/invoice')
        })
    }
}

module.exports = NotesControllers