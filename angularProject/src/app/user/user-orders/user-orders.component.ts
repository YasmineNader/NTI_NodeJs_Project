import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  getsession:any
  orders:any
  // userData:any
  constructor(private _user:UserService) {

    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
    //  console.log(this.getsession)
    this.Orders()

   }

  ngOnInit(): void {
  }

  Orders(){
  this._user.UserFinalOrder(this.getsession.ID).subscribe(res=>{
    this.orders=res
    console.log(res)

  })

  }

  // userBills(){
  //   this._user.orderBills(this.getsession.ID,this.order).subscribe(res=>{
  //     console.log(res)
  // })
  // }
}