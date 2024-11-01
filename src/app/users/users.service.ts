import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    getUsers(): any {
        return this.http.get('http://localhost:3000/users', {})
            .pipe(catchError(this.handleError));
    }

    deleteUser(userId: number): any {
        return this.http.delete('http://localhost:3000/users/' + userId, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    updateUser(userId: number, firstname: string, lastname: string) {

        return this.http.put('http://localhost:3000/users/' + userId,

            { firstname: firstname, lastname: lastname }, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    addUser(firstname: string, lastname: string) {
        return this.http.post('http://localhost:3000/users/',
            { firstname: firstname, lastname: lastname }, { responseType: 'text' })
            .pipe(catchError(this.handleError));
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
