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
        if(err) {
            req.flash('info', err)
            res.redirect('/product/add')
        }

        const saveProduct = await newProduct.save()
        req.flash('info',  `${saveProduct.name} berhasil ditambahkan`)
        res.redirect('/product/add')
    },
    createPage: (req, res) => {
        res.render('Pages/product-add')
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
    update: (req, res) => {
        Product.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true}, (err, doc) => {
            if (err) throw err
            if(!doc) {
                req.flash('info', err)
                res.redirect('/product/update')
            }
            req.flash('info', `${doc.name} berhasil diupdate`)
            res.redirect(`/product/update/${doc._id}`)
        })
    },
    updatePage: (req, res) => {
        Product.findOne({_id: req.params.id}, (err, doc) => {
            if (err) throw err
            if(!doc) {
                req.flash('info', err)
                res.redirect('/product')
            }
            res.render('Pages/product-update', {
                product: doc
            })
        })
        
    },
    delete: (req, res) => {
        Product.findOneAndRemove({_id: req.params.id, user: req.user._id}, (err, doc) => {
            if (err) throw err
            if (!doc) {
                req.flash('info', 'Produk tidak ditemukan')
                res.redirect('/product')
            }
            req.flash('info', `${doc.name} telah dihapus!`)
            res.redirect('/product')
        })
    }

}

module.exports = ProductController