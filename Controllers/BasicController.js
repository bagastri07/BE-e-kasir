const { data } = require('autoprefixer')
const Product = require('../Models/ProductSchema')



const BasicController = {
    login: (req, res) => {
        res.render('Pages/login')
    },
    register: (req, res) => {
        res.render('Pages/register')
    },
    dashboard: (req, res) => {
        Product.countDocuments({user: req.user._id}, (err, countDoc) => {
            if (err) throw err
            
            res.render('Pages/dashboard', {
                userName: req.user.name,
                productCount: countDoc
            })
        })
        
    }
}

module.exports = BasicController