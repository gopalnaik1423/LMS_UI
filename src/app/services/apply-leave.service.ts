import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
// import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ApplyLeaveService {

  baseUrl!:string;
  constructor(private http:HttpClient) { 
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

  CancelLeaveRequest(id: string) {
    return this.http.put<any>(`${this.baseUrl}CancelLeaveRequest?leaveId=`+id, id)
  }
  RejectLeaveRequest(id: string) {
    return this.http.put<any>(`${this.baseUrl}RejectLeaveRequest?empId=`+id, id)
    .pipe(catchError(this.errorHandler));
  }
  ApproveLeaveRequest(id: string) {
    return this.http.put<any>(`${this.baseUrl}ApproveLeaveRequest?leaveId=`+id, id)
    .pipe(catchError(this.errorHandler));
  }
  UploadUserFromExcel(file: any):Observable<any> {
    const formData1 = new FormData();
    formData1.append("file", file, file.name);
      return this.http.post<any>(this.baseUrl+'UploadUserFromExcel', formData1)
      .pipe(catchError(this.errorHandler));
  }
  postleaveData(file: any):Observable<any> {
    const formData2 = new FormData();
    formData2.append("file", file, file.name);
      return this.http.post<any>(this.baseUrl+'postleaveData', formData2)
      .pipe(catchError(this.errorHandler));
  }
  uploadEmpInfoFromExcel(file: any):Observable<any> {
    const formData3 = new FormData();
    formData3.append("file", file, file.name);
      return this.http.post<any>(this.baseUrl+'uploadEmpInfoFromExcel', formData3)
      .pipe(catchError(this.errorHandler));
  }
}
