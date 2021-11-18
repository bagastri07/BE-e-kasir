const response = require('../_helpers/response')
function isAlreadyLogin(req,res,next){
    if(req.isAuthenticated()){
        //req.isAlreadyLogin() will return true if user is logged in
        res.redirect('/dashboard')
    } else{
        next();
    }
}

module.exports = isAlreadyLogin;