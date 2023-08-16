import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { empInfo } from '../models/empInfo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit{
  baseUrl!:string;
  constructor(private http: HttpClient) {
    this.baseUrl=environment.baseUrl;
  }
  ngOnInit(): void {
   
  }

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
  getEmpInfo() {
    return this.http.get<any>(this.baseUrl+'EmpInfo');
  }
  getEmpInfobyId(id: string): Observable<empInfo> {
    return this.http.get<empInfo>(this.baseUrl+'GetEmpInfo?empid='+id);
  }
  getUserDetails(token: any): Observable<any> {
    return this.http.get<any>(this.baseUrl+'getUserDetails?token='+token);
  }
  getLeaveStatus(id: string){
    return this.http.get<any>(this.baseUrl+'GetLeaveStatus?empinfoId='+id);
  }
  getLeaveBalance(id: string){
    return this.http.get<any>(this.baseUrl+'GetLeaveBalance?empinfoId='+id);
  }
  getLeavesData(id: string){
    return this.http.get<any>(this.baseUrl+'LeavesData?id='+id);
  }
  getRejectedleaves(id: string){
    return this.http.get<any>(this.baseUrl+'GetRejectedleaves?empinfoId='+id);
  }
  getApprovedleaves(id: string){
    return this.http.get<any>(this.baseUrl+'GetApprovedleaves?empinfoId='+id);
  }
  getLeaveCounts(id: string){
    return this.http.get<any>(this.baseUrl+'getLeaveCounts?empinfoId='+id);
  }
  getActivites(id: string){
    return this.http.get<any>(this.baseUrl+'getLeaveApprovalDetails?empinfoId='+id);
  }
  getHolidaysData(){
    return this.http.get<any>(this.baseUrl+'GetUpcomingHoliday');
  }
  getAllHolidaysData(){
    return this.http.get<any>(this.baseUrl+'GetAllHolidays');
  }
  GetDeptEmpDetails(id: string){
    return this.http.get<any>(this.baseUrl+'GetDeptEmpDetails?id='+id);
  }
  GetdeptinchargePendingleaveRequests(id: string){
    return this.http.get<any>(this.baseUrl+'GetdeptinchargePendingleaveRequests?id='+id);
  }
  GetdeptinchargeApprovedleaveRequests(id: string){
    return this.http.get<any>(this.baseUrl+'GetdeptinchargeApprovedleaveRequests?id='+id);
  }
  GetdeptinchargeRequestedleaveRequests(id: string){
    return this.http.get<any>(this.baseUrl+'GetdeptinchargeRejectedleaveRequests?id='+id);
  }
  //department incharge count
  GetdeptinchargeEmpCounts(id: string){
    return this.http.get<any>(this.baseUrl+'GetdeptinchargeEmpCounts?empinfoId='+id);
  }
  GetSuperviserEmpDetails(id: string){
    return this.http.get<any>(this.baseUrl+'getSupervisorEmpDetails?id='+id);
  }
  GetWageInchargeEmpDetails(id: string){
    return this.http.get<any>(this.baseUrl+'GetWageInchargeEmpDetails?id='+id);
  }
  GetDoctorEmpDetails(id: string){
    return this.http.get<any>(this.baseUrl+'GetDoctorEmpDetails?id='+id);
  }
  GetEmployeesOnLeaveCount(id: string){
    return this.http.get<any>(this.baseUrl+'GetEmployeesOnLeaveCount?Id='+id);
  }
  PostApproveId(id:any){
    return this.http.put<any>(this.baseUrl+'ApproveLeaveRequest?leaveId='+id,id)
  }
  PostRejectId(id:any){
    return this.http.put<any>(this.baseUrl+'RejectLeaveRequest?empId='+id,id)
  }
  GetEmployeesOnLeaveForDay(id: string){
    return this.http.get<any>(this.baseUrl+'GetEmployeesOnLeaveForDay?Id='+id);
  }
  GetEmployeesPresentForDay(id: string){
    return this.http.get<any>(this.baseUrl+'GetEmployeesPresentForDay?Id='+id);
  }
}
