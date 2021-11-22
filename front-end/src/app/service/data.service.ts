import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

const options={
  withCredential:true,
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getOptions(){
    const token = localStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token){
      headers = headers.append("x-token",token)
      options.headers = headers
    }
    return options
  }

  signup(pname:any, email:any, phone:any, pwrd:any, create_date:any, isAdmin:any, isActive:any, isDeleted:any){
    const data = {
      pname, email, phone, pwrd, create_date, isAdmin, isActive, isDeleted
    }
    return this.http.post(environment.apiURL+'/signup', data)
  }
  

  login(email:any, pwrd:any){
    const data = {
      email, pwrd
    }
    return this.http.post(environment.apiURL+'/login', data, options)
  }

  addProduct(pname:any, prodName:any, price:any, description:any, imgPath:any){
    const data = {
      pname, prodName, price, description, imgPath
    }
    return this.http.post(environment.apiURL+'/addproduct', data, this.getOptions())
  }

  allUsers(admin:any){
    const data={
      admin
    }
    return this.http.post(environment.apiURL+'/allusers', data, this.getOptions())
  }

  userDetails(userId:any){
    const data={
      userId
    }
    return this.http.post(environment.apiURL+'/userdetails', data, this.getOptions())
  }
  

  deleteUser(userId:any){
    const data={
      userId
    }
    return this.http.post(environment.apiURL+'/delete', data, this.getOptions())
  }

  status(userId:any, status:any){
    const data={
      userId, status
    }
    return this.http.post(environment.apiURL+'/status', data, this.getOptions())
  }

  
  allProduct(user:any){
    const data={
      user
    }
    return this.http.post(environment.apiURL+'/allproducts', data, this.getOptions())
  }
  

  // end bracket
}
