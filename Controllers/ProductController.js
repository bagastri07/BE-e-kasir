const Product = require('../Models/ProductSchema')
const response = require('../_helpers/response')
const formatRupiah = require('../_helpers/formatRupiah')

const ProductController = {
    create: async (req, res) => {
        const product = req.body
        product.user = req.user._id

        const newProduct = new Product(product)

        //validate error
        err = await newProduct.validateSync()
        if(err) return response(res, 400, false, err)

        const saveProduct = await newProduct.save()
        return response(res, 200, true, 'Product Created', saveProduct)
    },
    createPage: (req, res) => {
        res.render
    },
    viewAll: (req, res) => {
        Product.find({user: req.user._id}).select('name price stock _id').exec( async (err, doc) => {
            if (err) throw err
            res.render('Pages/product-stock', {
                products: doc,
                formatRupiah: formatRupiah
            })
        })
    },
    delete: (req, res) => {
        Product.findOneAndRemove({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 500, 'Product not found')
            return response(res, 200, true, 'Product has been deleted', doc)
        })
    }

}

module.exports = ProductController