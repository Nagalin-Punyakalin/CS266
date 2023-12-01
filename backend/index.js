const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
require('dotenv').config()
const app = express()
const router = require('./routes/')
const PORT = process.env.PORT
require('./database/database')
require('dotenv').config()

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Express API for shopping website'
        },        
        servers: [
            {
                url: 'http://localhost:8000'
            }
        ]
    },
    apis: ['./routes/protected/admin/*.js','./routes/protected/user/*.js']
}

const specs = swaggerJsDoc(options)
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors({
    origin : 'http://localhost:3000'
}))
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))
app.use(router)

const server = app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

module.exports = server