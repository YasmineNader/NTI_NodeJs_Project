import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.css']
})
export class EditRegisterComponent implements OnInit {
  getsession:any
  accountInfo:any
  msg:any
  isSubmitted : boolean= false
  userEditvalues =new FormGroup({
  name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  // password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
  email:new FormControl('',[Validators.email,Validators.required]),
  address:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(80)]),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.minLength(11),Validators.maxLength(11)])
  })
  constructor(private _user:UserService,private route:Router) {

    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
    this.accountData();
// console.log(this.getsession.ID)
   }

  ngOnInit(): void {
  }


  formEditValues(){
    this.userEditvalues.get('name')?.setValue(this.accountInfo.name);

    this.userEditvalues.get('email')?.setValue(this.accountInfo.email);

    // this.userEditvalues.get('password')?.setValue(this.accountInfo.password);

    this.userEditvalues.get('address')?.setValue(this.accountInfo.address);

    this.userEditvalues.get('phone')?.setValue(this.accountInfo.phone);

  }
  accountData(){
    this._user.userAccountInfo(this.getsession.ID).subscribe(res=>{
      this.accountInfo = res
      console.log(res)
      this.formEditValues()
})

 
  }

  handleEditInfo(){
    this.isSubmitted=true

    this._user.userEditInform(this.getsession.ID,this.userEditvalues.value).subscribe(res=>{
  
      console.log(res.Message)
      this.msg=res.Message
})
  }


  get name(){ return this.userEditvalues.get('name')}
  get email(){ return this.userEditvalues.get('email')}
  get phone(){ return this.userEditvalues.get('phone')}
  get address(){ return this.userEditvalues.get('address')}
  // get password(){ return this.userEditvalues.get('password')}
}


