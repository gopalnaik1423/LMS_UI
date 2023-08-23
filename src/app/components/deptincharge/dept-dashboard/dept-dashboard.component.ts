import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressBarBehaviourSubject } from 'src/app/services/ProgressBarBehaviourSubject.service';
import { SnackBarService } from 'src/app/services/SnackBar.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-dept-dashboard',
  templateUrl: './dept-dashboard.component.html',
  styleUrls: ['./dept-dashboard.component.css']
})
export class DeptDashboardComponent implements OnInit {
  public holiday:any =[];
  public allHoliday:any =[];
  public activites:any =[];
  totalemp!:string;
  apllied!:string;
  approved!:string;
  cat!:string;
  reject!:string;
  public empRejectedData: any = [];
  public empApprovedData: any = [];
  public empPandingData: any = [];
  public empAllData: any = [];
  public empInfoId: string = "";
  public fullName: string = "";
  public role!: string;
  public tab1!: boolean;
  public tab2!: boolean;
  public tab3!: boolean;
  public tab4!: boolean;
  public approveleaves: any = [];
  showElement = true;
  shoWElmenttwo = false;
  ApprovedTable = false;
  Appliedlev =false;
  reectedLev = false;
  constructor(private  snk:SnackBarService,@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private api:ApiService,private pgbar:ProgressBarBehaviourSubject) { }
  ngOnInit(): void {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    this.empInfoId = jwtHelper.decodeToken(token!).nameid;
    this.fullName = jwtHelper.decodeToken(token!).unique_name;
    this.role = jwtHelper.decodeToken(token!).role;
    this.cat = jwtHelper.decodeToken(token!).certpublickey;
    this.getDepartmentAllCount();
    this.getDeptEmployeeData();
    this.getHolidaysDatas();
    this.getAllHolidaysDatas();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  Dash():void{
    this.showElement = true;
    this.shoWElmenttwo = false;
    this.ApprovedTable =false;
    this.Appliedlev = false;
    this.reectedLev = false;
    this._router.navigate(['/dept-addleaves']);
  }
//   tabone(): void {
//     this.showElement = false;
//     this.shoWElmenttwo = true;
//     this.ApprovedTable =false;
//     this.Appliedlev = false;
//     this.reectedLev = false;
//     this.tab1 = true;
//     this.tab2 = false;
//     this.tab3 = false;
//     this.tab4 = false;
//    // this.tabCount = 1;
// }
tabTwo(): void {
  this.showElement = false;
  this.shoWElmenttwo = false;
  this.ApprovedTable =false;
  this.Appliedlev = true;
  this.reectedLev = false;
  this.tab1 = true;
  this.tab2 = false;
  this.tab3 = false;
  this.tab4 = false;
  this.getDeptPendingleaveRequestsData();
 // this.tabCount = 1;
}
tabTthree(): void {
  this.showElement = false;
  this.shoWElmenttwo = false;
  this.ApprovedTable =true;
  this.Appliedlev = false;
  this.reectedLev = false;
  this.tab1 = false;
  this.tab2 = true;
  this.tab3 = false;
  this.tab4 = false;
  //this.getLeaves();
  this.getDeptApprovedleaveRequestsData();
 // this.tabCount = 1;
}
tabFour(): void {
  this.showElement = false;
  this.shoWElmenttwo = false;
  this.ApprovedTable =false;
  this.Appliedlev = false;
  this.reectedLev = true;
  this.tab1 = false;
  this.tab2 = true;
  this.tab3 = false;
  this.tab4 = false;
  //this.getLeaves();
  this.getDeptRequestedleaveRequestsData();
 // this.tabCount = 1;
}
  sidebarToggle(){
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  getDepartmentAllCount(){
    const id = this.empInfoId;
    this.api.GetdeptinchargeEmpCounts(this.empInfoId)
      .subscribe(res => {
        this.totalemp=res[0];
        this.apllied=res[1];
        this.approved=res[2];
        this.reject=res[3];
      });
  }
  getDeptEmployeeData(){
    this.api.GetDeptEmpDetails(this.empInfoId)
      .subscribe(res => {
        this.empAllData = res;
      });
  }
  getHolidaysDatas(){
    this.api.getHolidaysData()
    .subscribe(res => {
      this.holiday = res;
    });
  }
  getAllHolidaysDatas(){
    this.api.getAllHolidaysData()
    .subscribe(res => {
      this.allHoliday = res;
    });
  }
  getDeptPendingleaveRequestsData(){
    const id = this.empInfoId;
    this.api.GetdeptinchargePendingleaveRequests(this.empInfoId)
      .subscribe(res => {
        this.empPandingData = res;
      });
  }
  onGetApproveEmployee(event:Event){
    this.pgbar.visible();
    const selectedid = event;
    // alert(selectedid);
    this.api.PostApproveId(selectedid)
    .subscribe({
      next:(res=>{
        this.snk.SendSnackBarMsgSuccess("!"+ res + "!");
        this.getDepartmentAllCount();
        this.getDeptPendingleaveRequestsData();
        this.pgbar.hide();
      }),
      error:(err=>{
        this.snk.SendSnackBarMsgSuccess(err);
        this.getDepartmentAllCount();
        this.getDeptPendingleaveRequestsData();
        this.pgbar.hide();
      })
    });
  }
  onGetRejectEmployee(event:Event){
    debugger
    this.pgbar.visible();
    const selectedid = event;
    // alert(selectedid);
    this.api.PostRejectId(selectedid)
    .subscribe({
      next:(res=>{
        this.snk.SendSnackBarMsgSuccess("!"+ res + " !");
        this.getDepartmentAllCount();
        this.getDeptPendingleaveRequestsData();
        this.pgbar.hide();
      }),
      error:(err=>{
        this.snk.SendSnackBarMsgSuccess(err);
        this.getDepartmentAllCount();
        this.getDeptPendingleaveRequestsData();
        this.pgbar.hide();
      })
    });
  }
  getDeptApprovedleaveRequestsData(){
    const id = this.empInfoId;
    this.api.GetdeptinchargeApprovedleaveRequests(id)
      .subscribe(res => {
        this.empApprovedData = res;
      });
  }
  getDeptRequestedleaveRequestsData(){
    const id = this.empInfoId;
    this.api.GetdeptinchargeRequestedleaveRequests(id)
      .subscribe(res => {
        this.empRejectedData = res;
      });
  }
}
