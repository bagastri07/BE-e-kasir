const Product = require('../Models/ProductSchema')
const Cart = require('../Models/CartSchema')
const formatRupiah = require('../_helpers/formatRupiah')
const response = require('../_helpers/response')

const CartController = {
    addProductView: (req, res) => {
        Product.findOne({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) return res.render('Pages/error-page')
            if (!doc) return res.render('Pages/404')

            res.render('Pages/add-product-cart', {
                product: doc,
                formatRupiah: formatRupiah
            })
        })
    },
    Create: async (req, res) => {
        await Cart.findOneAndDelete({product: req.params.id, user: req.user._id})

        Product.findOne({_id: req.params.id, user: req.user._id}, async (err, doc) => {
            if (err) return res.render('Pages/error-page')
            if (!doc) return res.render('Pages/404')

            const cartData = {
                product: doc._id,
                quantity: req.body.quantity,
                price: doc.price,
                total: doc.price * req.body.quantity,
                user: req.user._id
            }

            const newCart = new Cart(cartData)

            //validate
            let error = await newCart.validateSync()
            if (error) return response(res, 400, false, error)

            await newCart.save()
            req.flash('info', 'Cart berhasil ditambahkan')
            return res.redirect('/product')
        })
    },

    viewAll: (req, res) => {
        Cart.find({user: req.user._id}).populate('product').exec((err, docs) => {
            if (err) return response(res, 500, false, err)
            return res.render('Pages/keranjangNota', {
                carts: docs,
                formatRupiah: formatRupiah
            })
        })
    },
    delete: (req, res) => {
        Cart.findOneAndDelete({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 400, false, 'Not found')

            req.flash('info', 'Cart berhasil dihapus')
            return res.redirect('/cart')
        })
    },
   
}

module.exports = CartController