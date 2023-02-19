const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const auth = require("../middleware/Auth");
const multer = require("multer");
const fs = require("fs");
var upload = multer({ dest: "public/images/" });

// var oldImage
flag=false
router.post("/admin/addProducts", auth.adminAuth,async (req, res) => {
  try {
    productQuan=0
    product = new Product(req.body);
    
    product.colors.forEach(element => {
    productQuan=parseInt(productQuan)+parseInt(element.quantity)
});

if(product.stock<productQuan){

  res.status(200).send({Error:"Stock is less than color Quantity"});
}else if(product.stock!=productQuan){

  res.status(200).send({Error:"Stock is Not Equal to color Quantity"});
  
}else{
 

    image =product.image
    image =image.replace(/C:\\fakepath\\/i,'')
    product.image = image
    flag=true

    await product.save();
    res.status(200).send({'Message':"Product Added Successfully"});
  }} catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/addProduct/uploadImage",auth.adminAuth,upload.single("profile")
,async (req, res) => {
    try {
    
    // console.log(flag) 


    if(flag==true){
      oldPath=req.file.path
      newPath=`./public/images/${req.file.originalname}`
  
      fs.rename(oldPath,newPath,(error)=>{
        if (error) console.log(error);
      })
      
     addImage= req.file.originalname
     addImage=addImage.replace(/C:\\fakepath\\/i,'')
     product.image=addImage
      console.log(addImage)
      // product.image = req.file.originalname;
  
      // await product.save();
      res.send({'Message':'image is added',"data":req.file.path});
    }} catch (e) {
      res.send(e.message);
    }
  }

  
  
);

router.get("/admin/allProducts", auth.adminAuth, async (req, res) => {
  try {
    products = await Product.find();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/admin/editProduct/:id", auth.adminAuth, async (req, res) => {
  productID = req.params.id;
  product = await Product.findById({ _id: productID });
  oldImage = product.image   
  productQuan=0

  updateItems = Object.keys(req.body);
  
  allowedItemToUpdate = ["name", "stock" , "price", "brand", "category","color","quantity","image","colors"];
  isAvailable = updateItems.every((item) => allowedItemToUpdate.includes(item));
  if (!isAvailable) {
    res.status(500).send({Error:"this Update Not Available"});
  }
  try {
    req.body.colors.forEach(element => {
      productQuan=parseInt(productQuan)+parseInt(element.quantity)

});


 if(parseInt(req.body.stock)!=parseInt(productQuan)){

  res.status(200).send({Error:"Stock is Not Equal to color Quantity"});
  
}else{

    updateItems.forEach((element) => {
    
      if(element=="image"&&req.body["image"]==""){

      }else{
       
      
     product[element] = req.body[element];
    if(element=="image"){
      imageName=req.body["image"]
      imageName=imageName.replace(/C:\\fakepath\\/i,'')
      
      product['image'] = imageName;
    }
  }
    });
    await product.save();
    res.status(200).send({"Message":"Product data Is Updated"});
  }} catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/admin/deleteProduct/:id", auth.adminAuth, async (req, res) => {
  try {
    
    productID = req.params.id;
    product = await Product.findByIdAndDelete({ _id: productID });
    product.save();

    res.status(200).send({"Message":"Product Is Deleted"});
  } catch (e) {
    res.status(500).send({"Message":"Product Is arleady Deleted"});
  }
});

router.get("/admin/ShowSingle/:id", auth.adminAuth, async (req, res) => {
  try {
    productID = req.params.id;
    product = await Product.findById({ _id: productID });
   

    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


router.post("/edit/uploadImage/:id",auth.adminAuth,upload.single("profile")
,async (req, res) => {
    try {
      id = req.params.id;
      product = await Product.findById({ _id: id });
      oldPath=req.file.path
      newPath=`./public/images/${req.file.originalname}`
      deletePath=`./public/images/${oldImage}`

      // deletePath=`C:/Users/yasmi/OneDrive/Desktop/old/NodeJS/project/nodeJsProject/public/images/${oldImage}`
      // imageWithExtension = `${req.file.path}.${req.file.originalname
      //   .split(".")
      //   .pop()}`;
      // fs.rename(req.file.path, imageWithExtension, (error) => {
      //   if (error) console.log(error);
      // });
      // console.log(req.file.originalname)
      // product.image = imageWithExtension;
      fs.rename(oldPath,newPath,(error)=>{
        if (error) console.log(error);
      })
      // if(req.file){
      product.image = req.file.originalname;
// console.log(oldImage)
      await product.save();
      console.log(deletePath)
      console.log(newPath)
      // if(newPath!=deletePath){
        // console.log(deletePath)
      if(oldImage!=req.file.originalname){
      fs.unlink(deletePath,(error)=>{
        if (error) console.log(error);
      })
    }
      res.send({'Message':'image is added',"data":req.file.path});
    // }
    } catch (e) {
      res.send(e.message);
    }
  }

  
  
);



module.exports = router;
