import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private _admin:AdminService,private _router:Router) { }

  ngOnInit(): void {
  }
  
  logOutAdmin(){
    this._admin.logOut().subscribe(res=>{
    localStorage.removeItem("adminToken")
    localStorage.clear()
  
    sessionStorage.clear();
    sessionStorage.removeItem("User")
    this._router.navigate(['/loginAdmin'])
    window.location.reload()
  
    console.log(res)
  })
    }
}
