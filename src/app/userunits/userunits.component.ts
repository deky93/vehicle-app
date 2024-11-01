import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserUnitsService } from './userunits.service';
declare function clearMarkers();
declare function clearMap();
@Component({
  selector: 'app-userunits',
  templateUrl: './userunits.component.html',
  styleUrls: ['../app.component.css'],
})
export class UserUnitsComponent {
  constructor(private dataService: UserUnitsService , private route: Router) {}
  usersFromDb: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  unitsFromDb;
  userUnitsFromDb: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  availableUnitsFromDb: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  usr_id;
  ngOnInit() {
    this.getUsersFromApi();
    clearMarkers();
    clearMap();
  }
  getUnitsByUserId(usr_id) {
    this.dataService.getUnitsByUserId(usr_id).subscribe((response) => {
      console.log(usr_id);
      console.log('response');
      console.log(response);
      this.unitsFromDb = response;
      let availableUnits = [];
      let userUnits = [];
      for (let i = 0; i < this.unitsFromDb.length; i++) {
        if (this.unitsFromDb[i].dostupan === true) {
          availableUnits.push(this.unitsFromDb[i]);
        } else {
          userUnits.push(this.unitsFromDb[i]);
        }
      }
      this.availableUnitsFromDb.next(availableUnits);
      this.userUnitsFromDb.next(userUnits);
      this.usr_id = usr_id;
    },(err)=>{
      console.log(err);
    });
  }
  getUsersFromApi() {
    this.dataService.getUsers().subscribe((response) => {
      console.log(response);
      this.usersFromDb.next(response);
    });
  }

  changeUnitDostupan(unt_id, unt_dostupan) {
    this.dataService.changeUnitDostupan(unt_id, unt_dostupan).subscribe(
      (response) => {
        console.log(response);
        this.getUnitsByUserId(this.usr_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  changeUserUnitData(unt_dostupan, unt_id, usr_id, usr_unt_id) {
    console.log(unt_dostupan);
    if (!unt_dostupan) {
      this.dataService.deleteUserUnitsByid(unt_id).subscribe(
        (response) => {
          console.log(response);
          this.changeUnitDostupan(unt_id, unt_dostupan);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.dataService.addNewUserUnits(unt_id, this.usr_id).subscribe(
        (response) => {
          console.log(response);
          this.changeUnitDostupan(unt_id, unt_dostupan);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  routerNavigateToMain() {
    this.route.navigate(['main']);
  }
}