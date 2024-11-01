import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {UnitHistory} from 'src/app/models/unit-history';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://autotrack.devellop.com:4000';

  

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(userName, password) {
    var data = `${userName}/${password}`;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.BaseURI + '/login/' + data, { headers: reqHeader });
  }

//   postLoginUser(username: string, password: string): Observable<LoginData>{
//     return this.httpClient.post<LoginData>(`${this.nodeApiUrl}/login/${username}/${password}`, {
//         headers: new HttpHeaders({
//             'Content-Type': 'application/json'
//         })
//     }).pipe(catchError(this.handleError));
// }

  // getUserProfile(startDate: string, endDate: string) {
  //   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token' : this.getToken()});
  //   return this.http.get(`${this.BaseURI}/history/777777007775/${startDate}/${endDate}`, { headers: reqHeader });
  // }

  getUnitHistory(unitId:number, startDate: string, endDate: string): Observable<UnitHistory[]>{
      console.log(localStorage.getItem('token'))
    return this.http.get<UnitHistory[]>(`${this.BaseURI}/history/${unitId}/${startDate}/${endDate}`,  {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'auth-token' : this.getToken()
        })
    })
}

getAllCars(): Observable<Unit[]> {
  const httpHeaders = new HttpHeaders({
    'auth-token': localStorage.getItem('token'),
  });
  console.log(localStorage.getItem('token'));
  return this.http
    .get<Unit[]>(
      `${this.BaseURI}/unit/allDetails/${localStorage.getItem('user_id')}/${localStorage.getItem('isGpsUser')}`,
      {
        headers: httpHeaders,
      }
    )
    .pipe(catchError(this.handleError));
  // .pipe(map((res) => res));
}

getToken(): string{
  return localStorage.getItem('token');
}

private handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
  }
  if (errorResponse.status == 403) {
      return throwError('403');
  }
  if (errorResponse.status == 404) {
      return throwError('404');
  }
  if (errorResponse.status == 500) {
      return throwError('500');
  }
  return throwError(errorResponse);
}
}
