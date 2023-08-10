'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = `Key`
const COLLECTION_NAME = `Keys`
// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true
    },
    privateKey:{
        type:String,
        require: true
    },
    refreshToken:{
        type:Array, default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);