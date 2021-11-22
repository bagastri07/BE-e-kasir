const passport = require('passport')

const AuthController = {
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
        req.logout()
        res.redirect('/')
    }
}

module.exports = AuthController