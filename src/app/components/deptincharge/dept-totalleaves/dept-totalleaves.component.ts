import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-dept-totalleaves',
  templateUrl: './dept-totalleaves.component.html',
  styleUrls: ['./dept-totalleaves.component.css']
})
export class DeptTotalleavesComponent implements OnInit {
  onLeave!:number;
  totalemp!:number;
  apllied!:string;
  approved!:string;
  reject!:string;
  public OnLevaeData: any = [];
  public OnPrasentData: any = [];
  public empAllData: any = [];
  public empInfoId: string = "";
  public fullName: string = "";
  public role!: string;
  public tab1!: boolean;
  public tab2!: boolean;
  public tab3!: boolean;
  showElement = true;
  onPresentdash = false;
  onLeavesdash = false;

  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private api:ApiService) { }
  ngOnInit(): void {
    this.getUserName();
    this.getRole();
    this.getEmpinfoId();
    this.getDepartmentAllCount();
    this.getDeptEmployeeData();
    this.getEmployeeOnLeaveCount();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  Dash():void{
    this.showElement = true;
    this.onPresentdash = false;
    this.onLeavesdash =false;
  }
  tabone(): void {
    this.showElement = false;
    this.onPresentdash = true;
    this.onLeavesdash =false;
    this.tab1 = true;
    this.tab2 = false;
    this.GetEmployeesOnPresentForDay();
   // this.tabCount = 1;
}
tabTwo(): void {
  this.showElement = false;
  this.onPresentdash = false;
  this.onLeavesdash =true;
  this.tab1 = true;
  this.tab2 = false;
  this.GetEmployeesOnLeaveOnDays();
 // this.tabCount = 1;
}

  sidebarToggle(){
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  getUserName(){
    this.userStore.getFullNameFromStore()
    .subscribe(val => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
  }
  //get role
  getRole() {
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
  }
  getEmpinfoId(){
    this.userStore.getIdFromStore()
      .subscribe(val => {
        const IdFromToken = this.auth.getIdFromToken();
        this.empInfoId = val || IdFromToken;
      });
  }
  getDepartmentAllCount(){
    const id = this.empInfoId;
    this.api.GetdeptinchargeEmpCounts(id)
      .subscribe(res => {
        this.totalemp=parseInt(res[0]);
        this.apllied=res[1];
        this.approved=res[2];
        this.reject=res[3];
      });
  }
  getDeptEmployeeData(){
    const id = this.empInfoId;
    this.api.GetDeptEmpDetails(id)
      .subscribe(res => {
        this.empAllData = res;
        console.log("test-->",this.empAllData);
      });
  }
  getEmployeeOnLeaveCount(){
    const id = this.empInfoId;
    this.api.GetEmployeesOnLeaveCount(id)
      .subscribe(res => {
        // console.log(res);
        this.onLeave=parseInt(res);
      });
  }
  GetEmployeesOnLeaveOnDays(){
    const id = this.empInfoId;
    this.api.GetEmployeesOnLeaveForDay(id)
      .subscribe(res => {
        this.OnLevaeData = res;
        // console.log(res);
      });
  }

  GetEmployeesOnPresentForDay(){
    const id = this.empInfoId;
    this.api.GetEmployeesPresentForDay(id)
      .subscribe(res => {
        this.OnPrasentData = res;
        // console.log(res);
      });
  }
}
