const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    duration:[{
        type:Object,
        required:true
    }],
    items:[{
        type:Object,
        required:true
    }],
    description:{
        type:String,
        required:true
    },
    created_on:{
        type:Date,
        default:Date.now()
    }
})


budgetSchema.virtual('thumbnail').get(function(){
  if(this.image != null && this.imageType != null)
  {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
  }
})

const Budget = mongoose.model('Budget',budgetSchema);
module.exports = Budget;