import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-bills',
  templateUrl: './user-bills.component.html',
  styleUrls: ['./user-bills.component.css']
})
export class UserBillsComponent implements OnInit {
  getsession:any
  userOrder:any
  UserData:any
  information:any
  constructor(private _user:UserService,private active:ActivatedRoute) {

    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');

    this.UserOrderBills()
    this.userinfo()

   }

  ngOnInit(): void {
  }

  UserOrderBills(){
  
  let OrderID = this.active.snapshot.paramMap.get('orderId')
  this._user.UserSingleFinalOrder(OrderID).subscribe(res=>{
    this.userOrder=res[0].products
    this.information=res[0]
    
    console.log("order")

     console.log(this.information._id)
     console.log("order")

  })
     
  }

  userinfo(){

    this._user.userAccountInfo(this.getsession.ID).subscribe(res=>{
      this.UserData=res
      console.log("info")
  
      console.log(res)
      console.log("info")
  
    })
   }

   print(){
    window.print();
   }

}




 