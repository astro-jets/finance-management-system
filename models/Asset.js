const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
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
    image:{
        type:Buffer
    },
    imageType:{
        type:String
    },
    created_on:{
        type:Date,
        default:Date.now()
    }
})


assetSchema.virtual('thumbnail').get(function(){
  if(this.image != null && this.imageType != null)
  {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
  }
})

const Asset = mongoose.model('Asset',assetSchema);
module.exports = Asset;