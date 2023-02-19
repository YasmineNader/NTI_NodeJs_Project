const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const user = require("../models/user.model");
const auth = require("../middleware/Auth");
const product = require("../models/product.model");
const Order = require("../models/order.model");

router.get("/user/AllOrders/:userID", auth.userAuth, async (req, res) => {
  try {
    userid = req.params.userID;

    orders = await Order.find({user_id:userid});
    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/SingleUserOrder/:orderID", auth.userAuth, async (req, res) => {
  try {
    orderId = req.params.orderID;

    order = await Order.find({_id:orderId});
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/bill/:orderID", auth.userAuth, async (req, res) => {
  try {
    orderId = req.params.orderID;

    orders = await Order.find({_id:orderId});

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/user/orders/:userID", auth.userAuth, async (req, res) => {
  try { 
    err=false
   
    userid = req.params.userID;

    productID = await product.find();
    userCart = await Cart.find({ user_id: userid }).populate("user_id", [
      "name",
      "phone",
      "email",
      "address",
    ]);
    //  console.log(userOrder)
    orders = new Order(req.body);
    productsArray=[];
    orders.totalprice = 0;
    orders.products.forEach((element,index) => {
      

      //for each element
      element.amount = Number(element.price) * Number(element.quantity);
      //for total price
      orders.totalprice += Number(element.price) * Number(element.quantity);

      orders.orderStatus = "Confirmed";
      
      productID.forEach((pro) => {
        
        if (element._id.toString() == pro._id.toString()) {
          productsArray.push(pro);
          if (parseInt(pro.stock) < parseInt(element.quantity)) {
            err=true

            res.status(200).send({  Error:  "There is no enough stock from product " +      pro.name +                  " the available stock is " +                  pro.stock,});
          } else {
            // pro.stock = parseInt(pro.stock) - parseInt(element.quantity);
            pro.colors.forEach(col => {
              console.log(col)
            //  console.log(col.quantity)
            //  console.log(element.quantity)

              if(col.color==element.color){

                if(parseInt(col.quantity)<parseInt(element.quantity)){

                  err=true

                res.status(200).send({Error:"There is no enough stock from product " +pro.name +" the available stock for color " + col.color+" is "+col.quantity});

                  
                }else{
                pro.stock = parseInt(pro.stock) - parseInt(element.quantity);

                col.quantity =parseInt(col.quantity) - parseInt(element.quantity)

                // console.log(col.quantity)
              }

              }
              
            });
            console.log(err)
            if(err==false &&(orders.products.length-1)==index)
            {
              productsArray.forEach(finalpro=>{
              finalpro.save();
            })
            }
          }
        }
      });

    });
    if(err==false)
{
  
  await orders.save();
    
    userOrders = await Order.find();
    //  console.log(userBills)

    userCart11 = await Cart.deleteMany({ user_id: userid });
    // console.log("--------------------------------------------");
    // console.log(userCart11);
    // console.log(userCart);
    // console.log("--------------------------------------------");
    res.status(200).send({Message: "bill Is created",bill: userOrders,userdata: userCart});
  }} catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/admin/Userbills", auth.adminAuth, async (req, res) => {
  try {
    orders = await Order.find();

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/admin/status/:id", auth.adminAuth, async (req, res) => {
  try {
    orderId = req.params.id;
    orders = await Order.findById({ _id: orderId });
    //  console.log(bills.orderStatus)
    orders.orderStatus = "Delivered";
    orders.save();

    res.status(200).send({ Message: "status is changed", data: orders });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/admin/cancelOrder/:id", auth.adminAuth, async (req, res) => {
  try {
    orderId = req.params.id;
    orders = await Order.findById({ _id: orderId });
    //  console.log(bills.orderStatus)
    console.log(orders);
    orders.orderStatus = "Cancelled";

    productID = await product.find();
    orders.products.forEach((element) => {
      productID.forEach((pro) => {
        if (element._id.toString() == pro._id.toString()) {
          //  pro.stock+=element.quantity
          pro.stock = parseInt(pro.stock) + parseInt(element.quantity);

          pro.save();
        }
      });
    });

    orders.save();

    res.status(200).send({ Message: "status is changed", data: orders });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
