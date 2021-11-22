import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dLogin: Date = new Date()
  allusers: any
  usersToShow:any
  user:any
  userCount:any
  msg:any
  userId:any
  userDetail:any
  chart:any
  backtoList:any


  productForm = this.fb.group({
    prodName: ['', [Validators.required, Validators.pattern('[a-zA-Z. ]*')]],
    price: ['', [Validators.pattern('[0-9]*')]],
    description: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9@_. ]*')]],
  })

  constructor(private route: Router, private ds: DataService, private fb: FormBuilder) { 
    this.user = localStorage.getItem('currUser')
    this.usersFetch()
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

  addProduct() {
    var pname = localStorage.getItem("currUser")
    var prodName = this.productForm.value.prodName
    var price = this.productForm.value.price
    var description = this.productForm.value.description
    var imgPath = this.productForm.value.prodName
    if (this.productForm.valid) {
      this.ds.addProduct(pname, prodName, price, description, imgPath)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            this.productForm.reset()
          }
        }, (result: any) => {
          alert(result.error.message)
        })
    }
  }

  usersFetch() {
    var admin = localStorage.getItem("currUser")
    this.ds.allUsers(admin)
      .subscribe((result: any) => {
        if (result.allUsersExAdmin.length == 0) {
          this.userCount = result.allUsersExAdmin.length
          this.msg = result.messageNo
          this.usersToShow = ""
        }
        else {
          this.allusers = result.allUsersExAdmin
          this.userCount = result.allUsersExAdmin.length
          this.msg = result.messageYes
          this.chart = true
        }
      }, ((result: any) => {
        this.msg = result.error.message
      }))
  }

  userList(){
    this.usersToShow = this.allusers
    this.chart = true
    this.userDetail = ""
    this.backtoList = ""
  }

  backToUserList(){
    this.usersFetch()
    this.usersToShow = this.allusers
    this.chart = true
    this.userDetail = ""
    this.backtoList = ""
  }

  userPage(event:any){
    this.userId = event.target.parentElement.id  
    this.ds.userDetails(this.userId)
    .subscribe((result:any)=>{
      if(result){
        this.userDetail = result.details
        this.usersToShow = ""
        this.chart = ""
        this.backtoList = true
      }
    }, ((result: any) => {
      this.msg = result.error.message
    }))
  }



  // end bracket
}
