`use strict`
const {db: {connectionString}} = require('../configs/config.mongodb')
const mongoose = require('mongoose')

//const connectionString = `mongodb+srv://tony68hcm:BkQIgdKROoIQxmKd@tonycluster.go1qv32.mongodb.net/tiki?retryWrites=true&w=majority`
const {countConnet} = require('../helpers/check.connect')

class Database {
    constructor(){
        this.connect()
    }

    connect(type = 'mongodb'){
        if( 1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }
        
        mongoose.connect(connectionString, {
            maxPoolSize: 50
        })
        .then( _ => {
            console.log(`connect success ${connectionString}`, countConnet())
        })
        .catch( err => console.log(`error connected to mongodb ${err}`))
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb