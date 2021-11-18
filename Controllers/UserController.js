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
            return response(res, 200, true, 'Data ready', doc)
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
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return response(res, 500, false, err)
            if (!user) {
                req.flash('error', 'Username atau Password anda salah')
                res.redirect('/')
            }
            req.logIn(user, (err) => {
              if (err) { return next(err); }
              res.redirect('/dashboard')
            });
          })(req, res, next);
    },
    logout: (req, res) => {
        if(!req.user) return response(res, 400, false, 'You need to login to logout')
        let username = req.user.username
        req.logout()
        res.redirect('/')
    }
}

module.exports = UserController