import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  dLogin:Date = new Date()
  signupForm=this.fb.group({
    pname:['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required, Validators.pattern('[a-z0-9@_.]*')]],
    phone:['',[Validators.required, Validators.pattern('[0-9]*')]],
    pwrd:['',[Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]]
  })

  constructor(private route:Router, private ds:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.dLogin.getDate()+'-'+(this.dLogin.getMonth()+1)+'-'+this.dLogin.getFullYear());
    
  }

  toggleTheme() {
    var element = document.body;
    element.classList.toggle("light-mode");
  }

  signup(){
    var pname=this.signupForm.value.pname
    var email=this.signupForm.value.email
    var phone=this.signupForm.value.phone
    var pwrd=this.signupForm.value.pwrd
    var isAdmin = false
    var create_date = (this.dLogin.getDate()+'-'+(this.dLogin.getMonth()+1)+'-'+this.dLogin.getFullYear())
    var isActive = true
    var isDeleted = false
    if(this.signupForm.valid){
      this.ds.signup(pname, email, phone, pwrd, create_date, isAdmin, isActive, isDeleted)
      .subscribe((result:any)=>{
        if (result){
          alert(result.message)
          this.route.navigateByUrl("")
        }
      }
      ,(result=>{
        alert(result.error.message)
      })
      )
    }
    else{
      alert("Invalid Form Details")
    }
  }

}
