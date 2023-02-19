const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const user = require("../models/user.model");
const auth = require("../middleware/Auth");
const product = require("../models/product.model");

router.get("/user/orderDetails/:id", auth.userAuth, async (req, res) => {
  try {
    productID = req.params.id
    productdata = await product.findById({_id:productID})
    
    
    res.status(200).send({"productData":productdata});
  }catch (e) {
    res.status(500).send(e.message);
  }
});

//Add To Cart
router.post("/user/AddOrder/:id", auth.userAuth, async (req, res) => {
  AllStock=0
   foundID=false
  // console.log(foundID)
 try {
   productID = req.params.id
   productdata = await product.findById({_id:productID})
   cart = new Cart(req.body);
    
    usercart =  await Cart.find()

    usercart.forEach((element)=>{

        element.products.forEach((ele)=>{
    
          //  if(cart.products[0]._id.toString()==ele._id.toString()){
            if(cart.products[0]._id.toString()==ele._id.toString() && cart.products[0].color.toString()==ele.color.toString())
            {
            foundID=true
            ele.quantity=parseInt(ele.quantity)+parseInt(cart.products[0].quantity)
            AllStock=ele.quantity
          
           }
           if(parseInt(productdata.stock)>=parseInt(AllStock)){
             element.save();
           }
      })

    })
    // console.log(cart.products._id)
    // products[0]
    //   console.log(cart.products[0].quantity)
    if(!cart.products.length){
      res.send({"productData":productdata,Error:"Please Enter Order"})
    }
   

    else if(parseInt(productdata.stock)<parseInt(AllStock)||parseInt(productdata.stock)<parseInt(cart.products[0].quantity))
    {
      res.send({Error:'There is no enough stock'})
    }
    else{
   
    cart.orderStatus="pending"
    if(foundID==false){
    await cart.save();
  }

    res.status(200).send({"productData":productdata,Message:"Order Is Done"});
  }
} catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/cart/:userID", auth.userAuth, async (req, res) => {
  try {
    userid=req.params.userID
    // console.log(userid)
    //    await req.user.populate({
    //        path:"userOrder"
    //    }).execPopulate()
    //    res.status(200).send(req.user.userOrder)
     alldata = await Cart.find({user_id:userid}).populate('user_id',["name","phone","email","address"]);
//      alldata.forEach((data)=>{
//       data.products.forEach((prod)=>{
//         console.log(prod.quantity * prod.price)        
        
//       })
// })
     ;//.populate('user_id',["name","phone"])
     //console.log(alldata);
    // alldata = await Order.find({user_id:userid})
    //   .populate("user_id","name")
      //.populate("products_id");

      // alldata.forEach(async (_products)=>{
      //   _products.products.forEach(async (val,index)=>{
      //post = await product.findById("60d79c933e0c1f128467b2bb").populate('product');
      //     console.log(post);
      //   })        
      // })

    res.status(200).send(alldata);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/singleOrder/:id", auth.userAuth, async (req, res) => {
  try {
    orderID = req.params.id;
    singledata = await Cart.findById({_id:orderID})

    // console.log(singledata)


    res.status(200).send(singledata);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.delete("/user/deleteOrder/:id",auth.userAuth,async (req, res) => {
    try {
        orderId=req.params.id
        cart= await Cart.findByIdAndDelete({ _id:orderId })
        
         cart.save()
      
  
      res.status(200).send({Message:"Order Is Deleted"});
    } catch (e) {
      res.status(500).send({Message:"Order Is already Deleted"});
    }
  })


  router.patch("/user/editOrder/:id", auth.userAuth, async (req, res) => {
      
    orderID = req.params.id;
    
    cart = await Cart.findById({_id:orderID})
    productdata = await product.findById({_id:cart.products[0]._id})
    if(productdata.stock<req.body.quantity){

      res.send({Error:"This is No Enough Stock"});
      
    }else{

    // console.log(cart)
    cartItem=Object.keys(req.body)
  
    allowedUpdateItems=['name','color','quantity','price','category']
    // console.log(cartItem);
    isAvailableItem = cartItem.every(item => {

       return allowedUpdateItems.includes(item)
    });
    // console.log(isAvailableItem);
    
    if(!isAvailableItem){
        res.status(500).send({Error:"this Updated Item Not Available"});
    }
    try{
    cartItem.forEach(element => {
      
// console.log(element + " "+ req.body[element]);
         cart['products'][0][element] = req.body[element]
        //  order[element]=req.body[element]
        


    });
      // console.log(cart);
   
    await cart.save()
    
    res.status(200).send({Message:"order is updated successfully"});

}catch(e){
    res.send(e.message)
}
} })
module.exports = router;
