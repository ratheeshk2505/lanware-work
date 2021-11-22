import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=this.fb.group({
    email:['', [Validators.required, Validators.pattern('[a-z0-9@_.]*')]],
    pwrd:['', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]]
  })

  dLogin:Date = new Date()

  constructor(private route:Router, private ds:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    var element = document.body;
    element.classList.toggle("light-mode");
  }
  
 

  login(){
    var email=this.loginForm.value.email
    var pwrd=this.loginForm.value.pwrd
      if(this.loginForm.valid){          
        this.ds.login(email,pwrd)
        .subscribe((result:any)=>{
          if(result){
            console.log("login ok");
            localStorage.setItem("token",result.token)
            localStorage.setItem("currUser",result.currUser)
            this.redirect(result.currUser, result.message_user, result.message_admin)
          }
        }
        , (result)=>{
          alert(result.error.message)
        }
        )
      }
      else{
        alert("Invalid Form Details")
      }
  }

  redirect(user:any, userM:any, userA:any){
    if(user == "admin"){
      this.route.navigateByUrl("dashboard")
      alert(userA)
    }
    else{
      this.route.navigateByUrl("products")
      alert(userM)
    }
  }

}
