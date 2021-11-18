const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const path = require('path')
const flash = require('express-flash')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 6000

//set up view engine
app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')

//set up public folder
app.use(express.static(path.join(__dirname, 'Public')))

// //Cors Set uo
// app.use(cors({
//     origin: '*'
// }))

//BodyParser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Database Connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Database Connected');
    }
  }
)

//passport
require('./passport-config/passportConfig')(passport)

//Session and flash
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 4 * 60 * 60 * 1000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

//Routers
app.use('/user', require('./Routers/UserRouter'))
app.use('/product', require('./Routers/ProductRouter'))
app.use(require('./Routers/BasicRouter'))


app.listen(port, () => {
    console.log('Server is running at port: ' + port)
})