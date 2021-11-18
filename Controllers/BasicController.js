const BasicController = {
    login: (req, res) => {
        res.render('Pages/login')
    },
    register: (req, res) => {
        res.render('Pages/register')
    },
    dashboard: (req, res) => {
        res.render('Pages/dashboard')
    }
}

module.exports = BasicController