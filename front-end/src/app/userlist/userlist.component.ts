import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../service/data.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  canvas: any
  rawData: any
  myChart: any
  date: any
  name: any

  constructor(private ds: DataService, private dashb: DashboardComponent) { 
    this.usersFetch()
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('myChart');
    Chart.register(...registerables)  
  }

  usersFetch() {
    var admin = localStorage.getItem("currUser")
    this.ds.allUsers(admin)
      .subscribe((result: any) => {
        if (result) {
          this.rawData = result.allUsersExAdmin
          this.date = this.rawData.map((arr: any) => arr.isActive)
          this.name = this.rawData.map((arr: any) => arr.pname)
          this.chart()

        }
      }, ((result: any) => {
        alert(result.error.message)
      }))
  }

  chart() {
    this.myChart = new Chart(this.canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Active User',
          data: this.date,
          backgroundColor: "rgb(0,0,0, 0.2)",
          borderColor: "#515911",
          fill: true,
        }],
        labels: this.name
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

}
