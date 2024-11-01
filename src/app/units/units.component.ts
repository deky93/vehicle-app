
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UnitsService } from './units.service';





@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units;
  unitId;
  marka;
  model;

  showUnitForm= false;
  showEditForm= false;

  constructor(private unitsService: UnitsService) { }

 ngOnInit(): void {
     this.getUnits();
 }

 getUnits() {
     this.unitsService.getUnits().subscribe(
       (data) => {
        this.units = data;
        console.log(data);
       },
       (err) => {
        console.log(err);
       }
     )
 }

 removeUnit(unitId : number) {
  this.unitsService.deleteUnit(unitId).subscribe(
    (data) => {
     console.log(data);
     this.getUnits();
    },
    (err) => {
     console.log(err);
    }
  )
 }

 editUnit() {
  this.unitsService.updateUnit(this.unitId,this.marka,this.model).subscribe(
    (data) => {
     console.log(data);
     this.getUnits();
    },
    (err) => {
     console.log(err);
    }
  )
 }

 showEditUnitForm(unitId, marka, model) {
   this.unitId = unitId;
   this.marka = marka;
   this.model = model;

   this.showEditForm = true;
 }

 closeEditUnitForm() {
  this.unitId = null;
  this.marka = '';
  this.model = '';

  this.showEditForm = false;
}

 addUnit() {
  this.unitsService.addUnit(this.marka,this.model).subscribe(
    (data) => {
     console.log(data);
     this.getUnits();
    },
    (err) => {
     console.log(err);
    }
  )
 }
 
 openUnitForm() {
   this.showUnitForm = true;
 }

 closeUnitForm() {
  this.showUnitForm = false;
}

}
