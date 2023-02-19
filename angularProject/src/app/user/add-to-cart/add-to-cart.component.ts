import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  colorName:any
  getsession:any
  productData:any
  msg:any
  isSubmitted : boolean= false
  orderForm=new FormGroup({
name:new FormControl(),
price:new FormControl(),
category:new FormControl(),
quantity:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
color:new FormControl("",[Validators.required,Validators.pattern("^[A-z]+$")]),

  })
  constructor(private _user:UserService,private active:ActivatedRoute,private _route:Router ) { 
    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
    //this.userorders()
    this.detailsOfOrder()

  }
formValues(){
  this.orderForm.get('name')?.setValue(this.productData.name)
  this.orderForm.get('price')?.setValue(this.productData.price)
  this.orderForm.get('category')?.setValue(this.productData.category)

}
  ngOnInit(): void {
  }
  

  detailsOfOrder(){
     let productId=this.active.snapshot.paramMap.get("productID")
    
    this._user.orderDetails(productId).subscribe(res=>{
          //  console.log('res.productData')
         this.productData=res.productData
         this.formValues()
         


    })
  }

  userorders(){
    this.isSubmitted=true
    let orderData=this.orderForm.value
    let productID=this.active.snapshot.paramMap.get("productID")
   
    this._user.addOrder(this.getsession.ID,productID,orderData,this.productData).subscribe(res=>{
    //  console.log(this.getsession.ID)ذ
    // console.log(orderData)
    console.log(res)
    this.msg=res.Error
    if(!this.msg){
    this._route.navigate(["User/cart"])
  }
    })
  }
  colorClick(color:any){
alert(color)
//  this.colorName=color
  }
get name(){return this.orderForm.get("name")}
get price(){return this.orderForm.get("price")}
get category(){return this.orderForm.get("category")}
get quantity(){return this.orderForm.get("quantity")}
get color(){return this.orderForm.get("color")}

}
