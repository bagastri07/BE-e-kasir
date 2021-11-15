const response = require('../_helpers/response')
function isAlreadyLogin(req,res,next){
    if(req.isAuthenticated()){
        //req.isAlreadyLogin() will return true if user is logged in
        return response(res, 400, false, 'You Are already login');
    } else{
        next();
    }
}

module.exports = isAlreadyLogin;