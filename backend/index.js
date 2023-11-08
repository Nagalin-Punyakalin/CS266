const express = require('express')
require('dotenv').config()
const app = express()
const router = require('./routes/index')
const PORT = process.env.PORT

app.use(router)
app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))