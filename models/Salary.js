const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    staff:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"User"
    },
    created_on:{
        type:Date,
        default:Date.now()
    },
    taxRate:{
        type:String,
        required:true
    },
    gross:{
        type:String,
        required:true
    },
    net:{
        type:String,
        required:true
    },
    taxed:{
        type:String,
        required:true
    }
})

const Salary = mongoose.model('Salary',salarySchema);
module.exports = Salary;