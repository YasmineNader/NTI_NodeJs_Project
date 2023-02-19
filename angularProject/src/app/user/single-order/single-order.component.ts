import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  getsession:any
orderData:any
UserData:any
OrderID:any
  constructor(private _user:UserService,private active:ActivatedRoute) { 

    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
    this.singleOrder()
  }

  ngOnInit(): void {
  }


  singleOrder(){
     this.OrderID = this.active.snapshot.paramMap.get('orderId')
    this._user.UserSingleFinalOrder(this.OrderID).subscribe(res=>{
      this.orderData=res

      // console.log(res)

    })

 }
 

  }

