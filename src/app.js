'use strict'
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const { errorHandler, initErrorHandler, asyncHandler } = require('./core/error.handler')
const app = express()

//init middle ware
app.use(morgan('combined'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
//app.use(initErrorHandler)
//app.use(errorHandler)

//onsole.log(`processs env`, process.env)

//init mongodb
require('./dbs/init.mongodb')

//init routes
app.use('', require('./routes'))



//const { checkOverload} = require('./helpers/check.connect')
//checkOverload()

module.exports = app