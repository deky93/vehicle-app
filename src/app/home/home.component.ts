import { UserService } from './../shared/user.service';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UnitHistory} from 'src/app/models/unit-history';
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';
import * as js from 'src/app/JS/js.js';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails : UnitHistory[];
  unitId : number;
  startDate:string;
  endDate:string;

  allCars = [];

  

  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  
  constructor(private router: Router, @Inject(LOCALE_ID) private locale: string,private service: UserService) { }

  ngOnInit() {
    js.initMap();
    this.service.getAllCars().subscribe((data) => this.allCars = data);
  }

  toogle() {
    let content = document.getElementById('content');

    if(content.style.display == "flex")
    {
      content.style.display = "none";
    }
    else
    {
      content.style.display = "flex"
    }
  }

  getUnitId(unitId : number) {
    this.unitId = unitId;
    this.unitHistory();
  }

  unitHistory() {

    this.startDate = formatDate(this.range.get('startDate').value, 'yyyy-MM-dd', this.locale);
    this.endDate = formatDate(this.range.get('endDate').value, 'yyyy-MM-dd', this.locale);

    this.service.getUnitHistory(this.unitId, this.startDate, this.endDate).subscribe(
      (data) => { //data , err
        console.log(data);
        let arrayOutter = [];
        if (data.length > 0) { //ovde foreach za mapu
          data.forEach((user) => {
            let arrayInner = [];
            arrayInner.push(user.latitude, user.longitude);
            arrayOutter.push(arrayInner);
          });

          js.clearMap(); //declare function
          js.drawPolyline(arrayOutter);
          js.fitBounds(js.polyline);
          // this.countries = [];
          // this.cities = [];
          // js.listCountriesCities(data, this.countries, this.cities);
        }
      },
      (err) => console.log(err)
    );

    this.service.getUnitHistory(this.unitId,this.startDate,this.endDate).subscribe(
      res => {
        this.userDetails = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
