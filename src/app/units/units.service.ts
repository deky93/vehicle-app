import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UnitsService {

    constructor(private http: HttpClient) { }

    getUnits(): any {
        return this.http.get('http://localhost:3000/units', {})
            .pipe(catchError(this.handleError));
    }

    deleteUnit(unitId: number): any {
        return this.http.delete('http://localhost:3000/units/' + unitId, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    updateUnit(unitId: number, marka: string, model: string) {

        return this.http.put('http://localhost:3000/units/' + unitId,

            { marka: marka, model: model }, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    addUnit( marka: string, model: string) {
        return this.http.post('http://localhost:3000/units/',
            { marka: marka, model: model }, { responseType: 'text' })
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
