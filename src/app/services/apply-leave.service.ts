import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

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
  }
  ApproveLeaveRequest(id: string) {
    return this.http.put<any>(`${this.baseUrl}ApproveLeaveRequest?leaveId=`+id, id)
  }
}
