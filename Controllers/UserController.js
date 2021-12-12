const User = require('../Models/UserSchema')
const bcrypt = require('bcrypt')
const response = require('../_helpers/response')
const passport = require('passport')
const { clearCache } = require('ejs')

const UserController = {
    create: (req, res) => {
        User.findOne({username: req.body.username}, async (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (doc) {
                req.flash('error', 'Username tersebut sudah terpakai')
                return res.redirect('/register')
            }

            var userData = req.body
            userData.password = await bcrypt.hash(userData.password, 5)

            const newUser = new User(userData)

            //Validate
            let error = await newUser.validateSync()
            if (error) return response(res, 400, false, error)

            const saveUser = await newUser.save();
            req.flash('info', 'Akun berhasil dibuat')
            return res.redirect('/register')
        })
    },
    view: (req, res) => {
        User.findOne({username: req.user.username}, (err, doc) => {
            if (err) return response(res, 500, false, err)

            let userData = {
                name: doc.name,
                username: doc.username,
            }
            return res.render('Pages/profil', {
                user: userData
            })
        })
    },
    delete: (req, res) => {
        User.findOneAndRemove({username: req.user.username}, (err, user) => {
            if (err) return response(res, 500, false, err)
            if (!user)return response(res, 400, true, 'Account not found')
            let data = req.user.username
            req.logout();
            return response(res, 200, true, 'Account Deleted & Account has been logout', data)
        })
    },
    update: async (req, res) => {
        var userData = req.body
        userData.password = await bcrypt.hash(userData.password, 5)

        User.findByIdAndUpdate({_id: req.user._id}, userData, {new: true}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                req.flash('info', 'No User found')
                res.redirect('/user/update')
            }
            req.user = doc
            req.flash('info', 'User berhasil diganti')
            res.redirect('/user')
        })
    },
    updateView: (req, res) => {
        let userData = {
            name: req.user.name,
            username: req.user.username
        }
        res.render('Pages/ubahProfil', {
            user: userData
        })
    }
    
}

module.exports = UserController