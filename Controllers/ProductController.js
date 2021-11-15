const Product = require('../Models/ProductSchema')
const response = require('../_helpers/response')

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
    viewAll: (req, res) => {
        Product.find({user: req.user._id}).select('name price _id').exec((err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'All product of the user', doc)
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