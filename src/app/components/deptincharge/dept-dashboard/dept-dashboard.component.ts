import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import ValidateForm from 'src/app/helpers/validationform';
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
  //////////////////////
  total!:string;
  apllied!:string;
  approved!:string;
  reject!:string;
  public holiday:any =[];
  public allHoliday:any =[];
  public activites:any =[];
  public leaves: any = [];
  public appliedleaves: any = [];
  public ballance: any = [];
  public rejectleaves: any = [];
  public applyLeave!: FormGroup;
  public fullName: string = "";
  public role!: string;
  public empInfoId: string = "";
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
  cat!:string;
  constructor(private snk:SnackBarService,@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private fb:FormBuilder,private pgbar:ProgressBarBehaviourSubject,private api:ApiService) { }
  ngOnInit(): void {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    this.empInfoId = jwtHelper.decodeToken(token!).nameid;
    this.fullName = jwtHelper.decodeToken(token!).unique_name;
    this.role = jwtHelper.decodeToken(token!).role;
    this.cat = jwtHelper.decodeToken(token!).certpublickey;
    this.getHolidaysDatas();
    this.getAllHolidaysDatas();
    this.getCountStatus();
    // this.getActivitesData();
    this.applyLeave = this.fb.group({
      empInfoId: this.empInfoId,
      modifiedByID:0,
      appliedType:['self'],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      todate: ['', Validators.required],
      fromSession: ['', Validators.required],
      toSession: ['', Validators.required],
      description: ['', Validators.required],
      applyTo: [''],
    });
    // this.getLeaves();
    // this.getLeavesRemaining();
  }
  Dash():void{
    this.showElement = true;
    this.shoWElmenttwo = false;
    this.ApprovedTable =false;
    this.Appliedlev = false;
    this.reectedLev = false;
    this._router.navigate(['/dept-addleaves']);
  }
  tabone(): void {
    this.showElement = false;
    this.shoWElmenttwo = true;
    this.ApprovedTable =false;
    this.Appliedlev = false;
    this.reectedLev = false;
    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = false;
    this.getLeaves();
    this.getLeavesRemaining();
   // this.tabCount = 1;
}
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
  this.getLeaveApplied();
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
  this.getApproveLeaves();
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
  this.getLeavesRejected();
 // this.tabCount = 1;
}
getApproveLeaves(){
  const id = this.empInfoId;
  this.api.getApprovedleaves(id)
    .subscribe(res => {
      this.approveleaves = res;
      // console.log(this.approveleaves);
    });
}
getLeavesRejected(){
  const id = this.empInfoId;
  this.api.getRejectedleaves(id)
    .subscribe(res => {
      this.rejectleaves = res;
      // console.log(this.rejectleaves);
    });
}
//applaied leave
getLeaveApplied(){
  const id = this.empInfoId;
  this.api.getLeaveStatus(id)
    .subscribe(res => {
      this.appliedleaves = res;
      // console.log("appiled",this.appliedleaves);
    });
}
  getLeavesRemaining(){
    const id = this.empInfoId;
    this.api.getLeaveBalance(id)
      .subscribe(res => {
        this.ballance = res[0];
        // console.log(this.ballance);
      });
  }
  onApplyLeave() {
    if (this.applyLeave.valid) {
      this.pgbar.visible();
      this.auth.applyLeaves(this.applyLeave.value)
      .subscribe({
        next:(res=>{
          this.applyLeave.reset();
          this.pgbar.hide();
          this.snk.SendSnackBarMsgSuccess("! Leave Applied Successfully !");
        }),
        error:(err=>{
          this.pgbar.hide();
          this.applyLeave.reset();
          this.snk.SendSnackBarMsgDanger(err);
        })
      })
    } else {
      let invalidFields = [];
  
      // Loop through each form control to check for invalid ones
      for (const controlName in this.applyLeave.controls) {
        if (this.applyLeave.controls.hasOwnProperty(controlName)) {
          const control = this.applyLeave.controls[controlName];
          if (control.invalid) {
            invalidFields.push(controlName);
          }
        }
      }
    
      // Build a message indicating which fields are required
      const errorMessage = `Please fill in the following fields: ${invalidFields.join(', ')}`;
      this.snk.SendSnackBarMsgDanger(errorMessage);
    }
  }

  maxDate = new Date(new Date().getTime() + 86400000).toISOString().substring(0, 10);
  getLeaves(){
    const id = this.empInfoId;
    this.api.getLeavesData(id)
      .subscribe(res => {
        this.leaves = res[0];
        console.log(this.leaves);
      });
  }
    //get leave status
    getCountStatus(){
      const id = this.empInfoId;
      this.api.getLeaveCounts(id)
        .subscribe(res => {
          this.total=res[0];
          this.approved=res[1];
          this.reject=res[2];
          this.apllied=res[3];
        });
    }
  getHolidaysDatas(){
    this.api.getHolidaysData()
    .subscribe(res => {
      this.holiday = res;
      // console.log(this.holiday);
    });
  }
  getAllHolidaysDatas(){
    this.api.getAllHolidaysData()
    .subscribe(res => {
      this.allHoliday = res;
      // console.log(this.holiday);
    });
  }
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
