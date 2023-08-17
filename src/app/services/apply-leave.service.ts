import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ApplyLeaveService {

  private baseUrl:string="https://localhost:7058/api/User"
  constructor(private http:HttpClient) { }

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
      return this.http.post<any>(this.baseUrl+'UploadUserFromExcel', formData1);
  }
  postleaveData(file: any):Observable<any> {
    const formData1 = new FormData();
    formData1.append("file", file, file.name);
      return this.http.post<any>(this.baseUrl+'UploadUserFromExcel', formData1);
  }
  generateExcel(data: any[], fileName: string) 
  { 
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data); 
    const wb: XLSX.WorkBook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
    XLSX.writeFile(wb, `${fileName}.xlsx`); 
  }
}
