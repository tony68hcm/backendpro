const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

//init middle ware
app.use(morgan('combined'))
app.use(helmet())
app.use(compression)

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'welcome to get'
    })
})

module.exports = app