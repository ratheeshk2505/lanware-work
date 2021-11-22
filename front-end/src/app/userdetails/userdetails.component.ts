import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  userDetail:any
  userId:any
  curr_status:any
  constructor(private ds:DataService, private dashb:DashboardComponent) {
    this.userDetail = this.dashb.userDetail
    this.userId = this.dashb.userDetail._id
    this.fetchDetails()
    
   }

  ngOnInit(): void {
  }

  fetchDetails(){
    this.ds.userDetails(this.userId)
    .subscribe((result:any)=>{
      if(result){
        this.userDetail = result.details
        this.curr_status = result.details.isActive
      }
    }, ((result: any) => {
      alert(result.error.message)
    }))
  }

  delete(){
    if(confirm("Are You Sure Want To Delete User..?")){
      this.ds.deleteUser(this.userId)
      .subscribe((result:any)=>{
        if(result){
          console.log("soft delete performed");
          this.userId = ""
        }
      }, (result:any)=>{
        alert(result.error.message)
      })
    }    
  }

  statusChange(){
    if(confirm("Do You Want to Change Status..?")){
      this.ds.status(this.userId, this.curr_status)
      .subscribe((result:any)=>{
        if(result){
          console.log("status changed");
          this.fetchDetails()
        }
      }, (result:any)=>{
        alert(result.error.message)
      })
    }  
  }

}
