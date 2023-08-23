import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordReset } from '../models/password-reset.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  baseUrl!:string;
  errorHandler(error: HttpErrorResponse): Observable<string> {
    return throwError(
      () =>
        error.error.error_description ||
        error.error ||
        error.message ||
        'Server Error'
    );
  }
  constructor(private http: HttpClient) {
    this.baseUrl=environment.baseUrl;
  }


  newpasswordReset(passwordResetObj:PasswordReset){
    return this.http.post<any>(`${this.baseUrl}reset-password`,passwordResetObj)
    .pipe(catchError(this.errorHandler));
  }
}
