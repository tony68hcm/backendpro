'use strict'

const mongoose = require('mongoose')

const connectionString = `mongodb+srv://tony68hcm:BkQIgdKROoIQxmKd@tonycluster.go1qv32.mongodb.net/tiki?retryWrites=true&w=majority`
mongoose.connect(connectionString)
.then( _ => console.log( `connected successfully` ))
.catch( err => console.log(`error connected to mongodb ${err}`))

if( 1 === 0){
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})
}

module.exports = mongoose