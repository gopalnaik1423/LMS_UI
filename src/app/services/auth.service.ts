import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
//import { JwtModule } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl!:string;
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
    this.baseUrl=environment.baseUrl;
   }
   errorHandler(error: HttpErrorResponse): Observable<string> {
    return throwError(
      () =>
        error.error.error_description ||
        error.error ||
        error.message ||
        'Server Error'
    );
  }
  applyLeaves(applydata : any){
    return this.http.post<any>(this.baseUrl+'ApplyLeave',applydata)
    .pipe(catchError(this.errorHandler));
  }

  signIn(loginObj : any){
    const userName=loginObj.username;
    const passWord=loginObj.password;
    const body="authenticate?Username="+userName+"&Password="+passWord;
    return this.http.post<any>(this.baseUrl+body,loginObj)
    .pipe(catchError(this.errorHandler));
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  //fullname
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  //for email
  getemailFromToken(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  // for Role 
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  // for Id 
  getIdFromToken(){
    if(this.userPayload)
    return this.userPayload.nameid;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
