import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  getsession:any
  msg:any
  isSubmitted : boolean= false
  EditPassword =new FormGroup({
  
    oldPassword:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
    newPassword:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)])
  })
  constructor(private _user:UserService,private route:Router) {

    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
    
   }

  ngOnInit(): void {
  }

editPassword(){
  this.isSubmitted = true

  this._user.userChangePassword(this.getsession.ID,this.EditPassword.value).subscribe(res=>{

    console.log(res)
    this.msg=res.Message

  })
}


  
 

 
   get oldPassword(){ return this.EditPassword.get('oldPassword')}
   get newPassword(){ return this.EditPassword.get('newPassword')}

}