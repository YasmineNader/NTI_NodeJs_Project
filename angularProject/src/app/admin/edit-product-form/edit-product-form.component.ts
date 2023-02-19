import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css']
})
export class EditProductFormComponent implements OnInit {
  categ = ["Men", "Women", "Kids"];
  file!:FileList 
  singleData:any
  msg:any
  isSubmitted:boolean=false
  // editProducts= new FormGroup({
  //   name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),

  //   stock:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]),
  //   // pattern numbers only '^((\\+91-?)|0)?[0-9]{11}$' "^[0-9]+$"  " /^[0-9]*$/"
  //   // pattern charachter only"/^[a-zA-Z]*$/"
  //   price:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]),
  //   brand:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern("^[A-z]+$")]),
  //   color:new FormControl('',[Validators.required]),
  //   category:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern("^[A-z]+$")]),
  //   image:new FormControl(''),


  // })
// red: any;
  constructor(private fb: FormBuilder,private _admin:AdminService,private activate:ActivatedRoute,private route:Router) {
    
    
    // console.log(this.singleData+"////////////////////////////")

   }
// editvalues(){
 
// }

   public editProducts:any;
   ngOnInit(): void {
    this.singleProduct()
      this.editProducts = this.fb.group({
    
     name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
     stock:['',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]],
     price:['',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]],
     brand:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern("^[A-z]+$")]],
     category:['',[Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern("^[A-z]+$")]],
     image:[''],
     colors: this.fb.array([]),
     //  color:['',[Validators.required]],
    //  quantity:['',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]],
     });
   
   }
   get rolesFieldAsFormArray(): any {
    return this.editProducts.get('colors') as FormArray;
  }

  role(color:any="" , quantity:any=""): any {
    return this.fb.group({
      color: [color,Validators.required],
      quantity: [quantity,[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]],
    });

   
  }

  addControl(color:any,quantity:any): void {
    this.rolesFieldAsFormArray.push(this.role(color,quantity));
  }

  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
  }

  formValues(){
    this.editProducts.get('name')?.setValue(this.singleData.name);
    this.editProducts.get('stock')?.setValue(this.singleData.stock);

    this.editProducts.get('price')?.setValue(this.singleData.price);

    this.editProducts.get('brand')?.setValue(this.singleData.brand);
    // this.editProducts.get('color')?.setValue(this.singleData.color);
    // this.editProducts.get('quantity')?.setValue(this.singleData.quantity);

    this.singleData.colors.forEach((Element:any) => {
    
      this.addControl(Element.color,Element.quantity);
     
    });

    this.editProducts.get('category')?.setValue(this.singleData.category);
    if(!this.singleData.image)
    this.editProducts.get('image')?.setValidators([Validators.required])
   // this.editProducts.get('image')?.setValue(this.singleData.image);
  }

  singleProduct(){
    let productID = this.activate.snapshot.paramMap.get('productID')
    this._admin.showSingleProducts(productID).subscribe(res=>{
      console.log(res);
      this.singleData=res;
      this.formValues();
      
    })
    
    }

    changePhoto(event:any){
      this.file=event.target.files
      // console.log(event.target.files)
    }

    uploadPhoto(){
      let productID=this.activate.snapshot.paramMap.get('productID')
      const sendimage =new FormData()
      // console.log(this.file)
      if(this.file){
      sendimage.append('profile',this.file[0])
  
      this._admin.editphoto(sendimage,productID).subscribe(res=>{
        console.log(res)

      })
    }
    }

  handleEditProducts(){
  this.isSubmitted=true
  
  let productID = this.activate.snapshot.paramMap.get('productID')
  console.log(productID)
  this._admin.updateProduct(this.editProducts.value,productID).subscribe(res=>{
    // console.log(this.editProducts.value)
    // console.log(res)
    this.msg=res.Error

     if(!this.msg){
    this.route.navigateByUrl('Admin/ShowAllProducts')
     }
  })
}
get name() {return this.editProducts.get('name')}
get stock(){return this.editProducts.get('stock')}
get price(){return this.editProducts.get('price')}
get brand(){return this.editProducts.get('brand')}
get category(){return this.editProducts.get('category')}
get image(){return this.editProducts.get('image')}
get colors(){
  return this.editProducts.get('colors') as FormArray;
}

// get color(){return this.editProducts.get('color')}
// get quantity(){return this.editProducts.get('quantity')}
}
