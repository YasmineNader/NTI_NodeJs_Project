const mongoose = require("mongoose")
const User = require('../models/user.model')
const product = require("../models/product.model");

const cartSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    

       products:[{
        
        _id:{type:mongoose.Schema.Types.ObjectId},
        quantity:{type:String,required:true},
        brand:{type:String,required:true},
        name:{type:String,required:true},
        color:{type:String,required:true},
        price: {type: String,required: true },
        category: {type: String,required: true },
        image:{type: String,required: true }
        

    }],
    orderStatus:{type:String}


},{ timestamps: true })
 //  products_id:[{

    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'products',
    //     required:true
    //   }]
    
// orderSchema.virtual("cartOrder", {
//     ref: "bills", 
//     localField: "user_id", 
//     foreignField: "user_id"
//   });

const cart= new mongoose.model('carts',cartSchema)

module.exports=cart