const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 6000

//Cors Set uo
app.use(cors({
    origin: '*'
}))

//BodyParser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Database Connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Database Connected');
    }
  }
)

app.get('/', (req, res) => {
    res.json('e-kasir API is alive!')
})

app.listen(port, () => {
    console.log('Server is running at port: ' + port)
})