import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterFormComponent } from './admin/register-form/register-form.component';
import { UploadImagesComponent } from './admin/upload-images/upload-images.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { ShowAllProductsComponent } from './admin/show-all-products/show-all-products.component';
import { ShowSingleProductsComponent } from './admin/show-single-products/show-single-products.component';
import { EditProductFormComponent } from './admin/edit-product-form/edit-product-form.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserBillsComponent } from './user/user-bills/user-bills.component';
import { ShowUserBillsComponent } from './admin/show-user-bills/show-user-bills.component';
import { SingleUserCartComponent } from './user/single-user-cart/single-user-cart.component';
import { EditOrderComponent } from './user/edit-order/edit-order.component';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component' ;
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { EditRegisterComponent } from './user/edit-register/edit-register.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ShowWatchCategoryComponent } from './user/show-watch-category/show-watch-category.component';
import { AddToCartComponent } from './user/add-to-cart/add-to-cart.component';
import { SingleOrderComponent } from './user/single-order/single-order.component';

const routes: Routes = [
  {path:"adminRegister",component:RegisterFormComponent},
  {path:"loginAdmin",component:LoginComponent},
  {path:"userRegister",component:RegisterComponent},
  {path:"User/changeInfo",component:EditRegisterComponent,canActivate:[UserGuard]},
  {path:"User/changePassword",component:ChangePasswordComponent,canActivate:[UserGuard]},
  {path:"loginUser",component:UserloginComponent},
  {path:"home",component:HomeComponent},
  {path:"User/SingleUserOrder/:orderId",component:SingleOrderComponent,canActivate:[UserGuard]},
  {path:"User/bill/:orderId",component:UserBillsComponent,canActivate:[UserGuard]},
  {path:"User/products/:category",component:ShowWatchCategoryComponent},
  {path:"User/AddCarts/:productID",component:AddToCartComponent,canActivate:[UserGuard]},
  {path:"User/cart",component:UserCartComponent,canActivate:[UserGuard]},
  {path:"User/SingleOrder/:orderId",component:SingleUserCartComponent,canActivate:[UserGuard]},
  {path:"User/EditOrder/:orderId",component:EditOrderComponent,canActivate:[UserGuard]},
  {path:"User/bills",component:UserBillsComponent,canActivate:[UserGuard]},
  {path:"User/orders",component:UserOrdersComponent,canActivate:[UserGuard]},
  {path:"upload/images/:productID",component:UploadImagesComponent,canActivate:[AdminGuard]},
  {path:"Admin/Home",component:AdminHomeComponent,canActivate:[AdminGuard]},
  {path:"Admin/AddProducts",component:AddProductsComponent,canActivate:[AdminGuard]},
  {path:"Admin/ShowAllProducts",component:ShowAllProductsComponent,canActivate:[AdminGuard]},
  {path:"Admin/ShowSingleProducts/:productID",component:ShowSingleProductsComponent,canActivate:[AdminGuard]},
  {path:"Admin/EditProduct/:productID",component:EditProductFormComponent,canActivate:[AdminGuard]},
  {path:"Admin/UserBills",component:ShowUserBillsComponent,canActivate:[AdminGuard]},
  {path:"Admin/ShowAllUser",component:AllUsersComponent,canActivate:[AdminGuard]},
  {path:"navbar",component:NavbarComponent},
  {path:"**",component:NotFound404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
