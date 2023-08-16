import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordReset } from '../models/password-reset.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  baseUrl!:string;
  constructor(private http: HttpClient) {
    this.baseUrl=environment.baseUrl;
  }


  newpasswordReset(passwordResetObj:PasswordReset){
    return this.http.post<any>(`${this.baseUrl}reset-password`,passwordResetObj);
  }
}
