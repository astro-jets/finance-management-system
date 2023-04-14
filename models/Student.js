const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    created_on:{
        type:Date,
        default:Date.now()
    }
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;