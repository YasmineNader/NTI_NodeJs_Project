const mongoose = require("mongoose")
const User = require('../models/user.model')

const orderSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    

    products:[{       
        _id:{type:mongoose.Schema.Types.ObjectId},
        price:{type:Number},
        brand:{type:String},
        quantity:{type:Number},
        amount:{type:Number},
        name:{type:String},
        color:{type:String},
        image:{type:String}
        
    }],
    orderStatus:{type:String},
    totalprice:{type:Number},
    
},{ timestamps: true })

const order= new mongoose.model('orders',orderSchema)

module.exports=order