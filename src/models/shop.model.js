`use strict`
const {Schema, Types, model} = require('mongoose')
//!dmbg
const DOCUMENT_NAME = `Shop`
const COLLECTION_NAME = `Shops`
// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxLeng: 150
    },
    email:{
        type:String,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default: 'inactive'
    },
    verify:{
        type: Schema.Types.Boolean,
        default: false
    }, 
    roles:{
        type: Array,
        default: []
    }
},{
    timestamps:true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema)