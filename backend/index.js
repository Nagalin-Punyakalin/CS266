const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
const router = require('./routes/')
const PORT = process.env.PORT
require('./database/database');

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors({
    origin : 'http://localhost:3000'
}))
app.use(router)

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

module.exports = app