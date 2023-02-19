import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-watch-category',
  templateUrl: './show-watch-category.component.html',
  styleUrls: ['./show-watch-category.component.css']
})
export class ShowWatchCategoryComponent implements OnInit {
categoryItems:any
  constructor(private _user:UserService,private active:ActivatedRoute) {
    this.productCategory()
   }

  ngOnInit(): void {
  }

  productCategory(){
    let category = this.active.snapshot.paramMap.get('category')

    this._user.categories(category).subscribe(res=>{
      this.categoryItems=res
      console.log(res)
    })
  }
}
