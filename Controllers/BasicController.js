const Product = require('../Models/ProductSchema')
const Note = require('../Models/NoteSchema')
const formatRupiah = require('../_helpers/formatRupiah')



const BasicController = {
    login: (req, res) => {
        res.render('Pages/login')
    },
    register: (req, res) => {
        res.render('Pages/register')
    },
    dashboard: (req, res) => {
        Product.countDocuments({user: req.user._id}, async (err, countDoc) => {
            if (err) throw err
            

            notes = await Note.find({user: req.user._id})

            totalPendapatan = 0
            notes.forEach(el => {
                totalPendapatan = totalPendapatan + el.total
            });

            jumlahNota = await Note.countDocuments({user: req.user._id})

            rataRata = totalPendapatan/jumlahNota

            res.render('Pages/dashboard', {
                userName: req.user.name,
                productCount: countDoc,
                totalPendapatan: totalPendapatan,
                formatRupiah: formatRupiah,
                jumlahPenjualan: jumlahNota,
                rataRata : rataRata
            })
        })
        
    }
}

module.exports = BasicController