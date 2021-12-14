const NotesControllers = {
    view: (req, res) => {
        res.render('Pages/detailProduct')
    },
    createPage: (req, res) => {
        res.render('Pages/add-product-to-invoice')
    }
}

module.exports = NotesControllers