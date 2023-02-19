import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  file!:FileList 
msg:any
  categ = ["Men", "Women", "Kids"];
  isSubmitted:boolean=false;
  

  // addProducts= new FormGroup({
  //   name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  //   stock:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]),
  //   //pattern numbers only '^((\\+91-?)|0)?[0-9]{11}$' "^[0-9]+$"  " /^[0-9]*$/"
  //   //pattern charachter only"/^[a-zA-Z]*$/"
  //   price:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]),
  //   brand:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern("^[A-z]+$")]),
  //   category:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern("^[A-z]+$")]),
  //   color:new FormControl('',[Validators.required]),
  //   quantity:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]),
  //   image:new FormControl('',[Validators.required]),


  // })
  constructor(private fb: FormBuilder,private _admin:AdminService,private route:Router,private _activeRoute:ActivatedRoute) {
   
   }

 public addProducts:any;
  ngOnInit(): void {

     this.addProducts = this.fb.group({
   
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
    stock:['',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]],
    price:['',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]],
    brand:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern("^[A-z]+$")]],
    category:['',[Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern("^[A-z]+$")]],
    image:['',[Validators.required]],
    colors: this.fb.array([
      this.role()
    ]),
    //color:['',[Validators.required]],
    //quantity:['',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]],
    });
  
  }
  get rolesFieldAsFormArray(): any {
    return this.addProducts.get('colors') as FormArray;
  }

  role(): any {
    return this.fb.group({
     color: this.fb.control('',[Validators.required]),
     quantity: this.fb.control('',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]),
    // color: ['',Validators.required],
    // quantity:['',[Validators.required,Validators.minLength(2)]],
    });
  }

  addControl(): void {
    this.rolesFieldAsFormArray.push(this.role());
  }

  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
  }

  // formValue(): void {
  //   console.log(this.form.value);
  // }

  changePhoto(event:any){
    this.file=event.target.files
    // console.log(event.target.files)
  }

  uploadPhoto(){
    const sendimage =new FormData()
    if(this.file)
    sendimage.append('profile',this.file[0])

    this._admin.addimage(sendimage).subscribe(res=>{
      console.log(res)
    })
  }
handleAddProducts(){
  this.isSubmitted=true;
  
    // this._admin.addProducts(this.addProducts.value).subscribe(res=>{
    this._admin.addProducts(this.addProducts.value).subscribe(res=>{

    //  console.log(res)
     this.msg=res.Error
     if(!this.msg){
      this.route.navigateByUrl('/Admin/ShowAllProducts')
 } 
})
}
// get name() {return this.addProducts.get('name')}
// get stock(){return this.addProducts.get('stock')}
// get price(){return this.addProducts.get('price')}
// get brand(){return this.addProducts.get('brand')}
// get category(){return this.addProducts.get('category')}
// get color(){return this.addProducts.get('color')}
// get quantity(){return this.addProducts.get('quantity')}
// get image(){return this.addProducts.get('image')}

get name() {return this.addProducts.get('name')}
get stock(){return this.addProducts.get('stock')}
get price(){return this.addProducts.get('price')}
get brand(){return this.addProducts.get('brand')}
get category(){return this.addProducts.get('category')}
get image(){return this.addProducts.get('image')}
get colors(){
  return this.addProducts.get('colors') as FormArray;
}
//get color(){return this.addProducts.get('color')}
//get quantity(){return this.addProducts.get('quantity')}

// j=1


// addColor(){
// var whoDiv=document.getElementById('colorDiv')
// // var colDiv=document.getElementById('col')
// var colDiv=document.createElement('div')
// colDiv.classList.add("mb-3")
// colDiv.style.width="40%"
// whoDiv?.appendChild(colDiv)
// var colorArray = ["red","blue","green"];
// var selectList = document.createElement("select");
// selectList.classList.add("form-select","mb-3");
// selectList.style.width="50%"
// selectList.setAttribute('formControlName',"color"+this.j)
// // selectList.id = "mySelect";
// colDiv?.appendChild(selectList);
// for (var i = 0; i < colorArray.length; i++) {
//     var option = document.createElement("option");
//     option.value = colorArray[i];
//     option.text = colorArray[i];
//     selectList.appendChild(option);
// }
// this.j++

// // var quanDiv=document.getElementById('quan')
// var quanDiv=document.createElement('quan')
// quanDiv.classList.add("mb-3")
// quanDiv.style.width="60%"
// whoDiv?.appendChild(quanDiv)
// var qua = document.createElement("input")
// qua.style.width = "50%"
// qua.classList.add("form-control","mb-3")
// qua.setAttribute('type','text')
// quanDiv?.appendChild(qua)

// }
// deleteColor(){
//   var whoDiv=document.getElementById('colorDiv')

// }

}
