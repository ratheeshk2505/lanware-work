import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dLogin: Date = new Date()
  user:any
  productLists:any

  constructor(private ds:DataService, private route:Router) {
    this.user = localStorage.getItem('currUser')
    this.listProduct()
   }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert("Access Denied. Please Login")
      this.route.navigateByUrl("")
    }
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("currUser")
    this.route.navigateByUrl("")
  }

  toggleTheme() {
    var element = document.body;
    element.classList.toggle("light-mode");
  }

  listProduct(){
    var user = localStorage.getItem("currUser")
    this.ds.allProduct(user)
    .subscribe((result:any)=>{
      if(result){
        this.productLists = result.products
      }
    }, ((result: any) => {
      alert(result.error.message)
    }))
  }

}
