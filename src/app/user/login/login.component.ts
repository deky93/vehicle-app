import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  // auth(login): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this._http.post('url:3000/api/auth/login', { ...login })
  //       .subscribe((response: any) => {
  //         resolve(response);
  //       });
  //   });
  //  }
  
  onSubmit(userName,password) {
    this.service.login(userName,password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res[0].token);
        localStorage.setItem('user_id', res[0].userId);
        localStorage.setItem('isGpsUser', res[0].isGpsUser);
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
          //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          console.log(err);
        else
          console.log(err);
      }
    );
  }
}
