const Product = require('../Models/ProductSchema')
const Cart = require('../Models/CartSchema')
const formatRupiah = require('../_helpers/formatRupiah')

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
    Create: (req, res) => {
        Product.findOne({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) return res.render('Pages/error-page')
            if (!doc) return res.render('Pages/404')

            res.json(req.body)
        })
    }
}

module.exports = CartController