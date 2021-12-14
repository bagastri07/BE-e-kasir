const Product = require('../Models/ProductSchema')
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
        
    }
}

module.exports = CartController