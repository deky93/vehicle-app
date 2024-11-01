import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import * as js from 'src/app/JS/js.js';

declare function drawMarker(currentLocation);
declare function clearMap();
declare function clearMarkers();

@Component({
  selector: 'monitoring-component',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent {
  startDate: any;
  endDate: any;
  token: any;
  user_id: any;
  isGpsUser: any;

  constructor(
    private dataService: UserService,
    private route: Router
  ) {}
  unitId: any;
  allCarsHistory;
  ngOnInit() {
   
    this.getAllCars();
    js.clearMap();
  }
 
 
  changeUnitId(unitId) {
    this.unitId = unitId;
    this.submit();
  }
  getAllCars() {
    this.dataService.getAllCars().subscribe(
      (res) => {
        this.allCarsHistory = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submit() {
    js.clearMap();
    js.clearMarkers();
    for (let i = 0; i < this.allCarsHistory.length; i++) {
      if (this.unitId === this.allCarsHistory[i].unit_id) {
        console.log();
        let currentLocation = [
          this.allCarsHistory[i].latitude,
          this.allCarsHistory[i].longitude,
        ];
        js.drawMarker(currentLocation);
      }
    }

  }
  routerNavigateToMain() {
    this.route.navigate(['home']);
    js.clearMarkers();
    
  }
}