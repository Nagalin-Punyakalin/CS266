const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const router = require('./routes/index')
const PORT = process.env.PORT
require('./database/database');

app.use(cors({
    origin : 'http://localhost:3000'
}))
app.use(router)

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

module.exports = app