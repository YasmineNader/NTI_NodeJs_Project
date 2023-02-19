import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _user:HttpClient) { }

  userRegister(data:any):Observable<any>{
    return this._user.post("http://localhost:3000/user/SignUp",data)

  }
  userAccountInfo(userId:any):Observable<any>{
    return this._user.post(`http://localhost:3000/user/info/${userId}`,null)

  }
  
  userEditInform(userId:any,editValue:any):Observable<any>{
    return this._user.post(`http://localhost:3000/user/changeInfo/${userId}`,editValue)

  }

  userChangePassword(userId:any,editValue:any):Observable<any>{
    return this._user.post(`http://localhost:3000/user/changePassword/${userId}`,editValue)

  }

  userLogin(data:any):Observable<any>{
    return this._user.post("http://localhost:3000/user/login",data)

  }
  
  alldata():Observable<any>{
    return this._user.get("http://localhost:3000/user/allProducts")

  }
  categories(categories:any):Observable<any>{
    return this._user.get(`http://localhost:3000/user/products/${categories}`)

  }
  logOut():Observable<any>{
    return this._user.post("http://localhost:3000/user/logOut",null)

  }
  userDeleteHimself():Observable<any>{
    return this._user.delete("http://localhost:3000/user/delete")

  }
  
  

  orderDetails(productID:any):Observable<any>{
    return this._user.get( `http://localhost:3000/user/orderDetails/${productID}`)
  }
  



  addOrder(userID:any,productID:any,orderData:any,productData:any):Observable<any>{
   var data={
  'user_id':userID
      ,'products':[{
    '_id' : productID,
                'quantity' : orderData['quantity'],
                'name' : orderData['name'],
                'color' : orderData['color'],
                'price' : orderData['price'],
                'category' : orderData['category'],
                'image' : productData['image'],
                'brand':productData['brand']


      }]
 
    }
    

    return this._user.post(`http://localhost:3000/user/AddOrder/${productID}`, data)

  }

  //order in the cart
  userOrders(UserID:any,orderData:any):Observable<any>{
    return this._user.post( `http://localhost:3000/user/Orders/${UserID}`,{"user_id": UserID,"products":orderData})
  }
    //order in the cart

  AllUserOrders(UserID:any):Observable<any>{
    return this._user.get(`http://localhost:3000/user/cart/${UserID}`)
  }
  //order in the cart

  UserSingleOrder(OrderID:any):Observable<any>{
    return this._user.get( `http://localhost:3000/user/singleOrder/${OrderID}`)
  }
    //order in the cart

  UserDeleteOrder(OrderID:any):Observable<any>{
    return this._user.delete( `http://localhost:3000/user/deleteOrder/${OrderID}`)
  }  
    //order in the cart

  UserEditOrder(OrderID:any,orderData:any):Observable<any>{
    return this._user.patch( `http://localhost:3000/user/editOrder/${OrderID}`,orderData)
  } 
 
  UserFinalOrder(UserID:any):Observable<any>{
    return this._user.get(`http://localhost:3000/user/AllOrders/${UserID}`)
  } 
  
  UserSingleFinalOrder(orderId:any):Observable<any>{
    return this._user.get(`http://localhost:3000/user/SingleUserOrder/${orderId}`)
  } 
  
}


