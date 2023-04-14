const mongoose = require('mongoose')

const feesSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Student"
    },
    created_on:{
        type:Date,
        default:Date.now()
    },
    ammount:{
        type:String
    }
})

const Fees = mongoose.model('Fees',feesSchema);
module.exports = Fees;