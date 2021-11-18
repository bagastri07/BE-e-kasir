const response = require('../_helpers/response')
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect('/');
    }
}

module.exports = isAuthenticated;