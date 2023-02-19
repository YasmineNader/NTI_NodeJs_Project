import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  productId:any
  getsession:any
  orders:any
  order:any=[]
  msg:any

  constructor(private _user:UserService,private route:Router) {   
    
   this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');


    // this.userCart()
    this.userOrders()
  }

  ngOnInit(): void {
  }
  userOrders(){

    this._user.AllUserOrders(this.getsession.ID).subscribe(res=>{
      this.orders=res
      console.log("orders")
      console.log(res)
      console.log("orders")

    })
  }

 
  deleteOrder(orderId:any){
               
    this._user.UserDeleteOrder(orderId).subscribe(res=>{
      console.log(res)
     
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate(['User/cart']);
    })

  }


  
  UserCartOrder(){
  
    this._user.AllUserOrders(this.getsession.ID).subscribe(res=>{
      // this.order=res
     
      // this.userData = res[0]?.user_id   
      res.forEach((data:any)=>{
        data.products.forEach((prod:any)=>{
          // console.log(prod)        
          this.order.push(prod)
        })
  })
        // console.log(this.order)  
    
        this._user.userOrders(this.getsession.ID,this.order).subscribe(res=>{
          console.log(res.Error)
          this.msg=res.Error
          if(this.msg==undefined){
          this.route.navigateByUrl('/User/orders')
        }
      })
    })

  }
  // userCart(){

  //   this._user.orderDetails(this.productId).subscribe(res=>{
  //     console.log(res)
  //   })
  // }


  
}
