import { UserService } from './../shared/user.service';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  id;
  firstname;
  lastname;

  showUserForm= false;
  showEditForm= false;

  constructor(private usersService: UsersService) { }

 ngOnInit(): void {
     this.getUsers();
 }

 getUsers() {
     this.usersService.getUsers().subscribe(
       (data) => {
        this.users = data;
        console.log(data);
       },
       (err) => {
        console.log(err);
       }
     )
 }

 removeUser(userId : number) {
  this.usersService.deleteUser(userId).subscribe(
    (data) => {
     console.log(data);
     this.getUsers();
    },
    (err) => {
     console.log(err);
    }
  )
 }

 editUser() {
  this.usersService.updateUser(this.id,this.firstname,this.lastname).subscribe(
    (data) => {
     console.log(data);
     this.getUsers();
    },
    (err) => {
     console.log(err);
    }
  )
 }

 showEditUserForm(id, firstname, lastname) {
   this.id = id;
   this.firstname = firstname;
   this.lastname = lastname;

   this.showEditForm = true;
 }

 closeEditUserForm() {
  this.id = null;
  this.firstname = '';
  this.lastname = '';

  this.showEditForm = false;
}

 addUser() {
  this.usersService.addUser(this.firstname,this.lastname).subscribe(
    (data) => {
     console.log(data);
     this.getUsers();
    },
    (err) => {
     console.log(err);
    }
  )
 }
 
 openUserForm() {
   this.showUserForm = true;
 }

 closeUserForm() {
  this.showUserForm = false;
}

}
