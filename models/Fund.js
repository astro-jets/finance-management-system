const mongoose = require('mongoose')

const fundSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    created_on:{
        type:Date,
        default:Date.now()
    }
})

const Fund = mongoose.model('Fund',fundSchema);
module.exports = Fund;