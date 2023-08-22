import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ɵɵDirectiveDeclaration } from '@angular/core'; 
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validationform';
import { ProgressBarBehaviourSubject } from 'src/app/services/ProgressBarBehaviourSubject.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { SnackBarService } from 'src/app/services/SnackBar.service';
import { Subject } from 'rxjs';
declare var $:any;
declare var bootstrap: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  foo!:Date;
  cat!:string;
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
  tokenID!:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  beHalfEmpId:any = 0;
  constructor(private snk: SnackBarService,@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private fb:FormBuilder,private pgbar:ProgressBarBehaviourSubject,private api:ApiService) {

   }
  ngOnInit(): void {
    const token=localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    this.tokenID = jwtHelper.decodeToken(token!).nameid;
    this.role =  jwtHelper.decodeToken(token!).role;
    this.fullName =  jwtHelper.decodeToken(token!).unique_name;
    this.cat =   jwtHelper.decodeToken(token!).certpublickey;
    this.InitiatilizeFielsd();
    // this.getEmpinfoId();
    this.getHolidaysDatas();
    this.getAllHolidaysDatas();
    this.getCountStatus();
    this.getLeaves();
    this.getLeavesRemaining();
    this.getLeaveApplied();
    this.getApproveLeaves();
    this.getLeavesRejected();

   

  // this.api.getUserDetails(token)
  // .subscribe(res => {
    
  //   this.role=res[0].role;
  //   this.fullName=res[0].username;  
  //   this.cat = res[0].category;
  //   console.log(res);
  // });
    // this.getActivitesData();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  changeFn(e:any) {
    this.foo = e.target.value;
  }

  InitiatilizeFielsd(){
    this.applyLeave = this.fb.group({
      empInfoId: this.tokenID,
      modifiedByID:this.beHalfEmpId,
      appliedType:[''],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      todate: ['', Validators.required],
      fromSession: ['', Validators.required],
      toSession: ['', Validators.required],
      description: ['', Validators.required],
      applyTo: [''],
    });
  }
  Dash():void{
    this.showElement = true;
    this.shoWElmenttwo = false;
    this.ApprovedTable =false;
    this.Appliedlev = false;
    this.reectedLev = false;
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
    this.getLeavesRemaining()
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
  this.SetExportControls();
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
  this.SetExportControlstwo()
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
  this.SetExportControlsthree();
 // this.tabCount = 1;
}
getApproveLeaves(){
  // const id = this.empInfoId;
  // $("#tblServicesReport").dataTable().fnDestroy();
  this.api.getApprovedleaves(this.tokenID)
    .subscribe(res => {
      this.approveleaves = res;
      this.SetExportControlstwo();
    });
  }
  
SetExportControls(){
  $("#tblServicesReport").dataTable().fnDestroy();
  $(document).ready(function() {
    var table = $('#tblServicesReport').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu : [5, 10, 25],
      dom: 'Blfrtip',
      buttons: ['csv','excel', 'pdf', 'print' ]
    } );
} );
  }
  SetExportControlsone(){
    $("#tbl1").dataTable().fnDestroy();
    $(document).ready(function() {
      var table = $('#tbl1').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu : [5, 10, 25],
        dom: 'Blfrtip',
        buttons: ['csv','excel', 'pdf', 'print' ]
      } );
  } );
    }
    SetExportControlstwo(){
      $("#tbl2").dataTable().fnDestroy();
      $(document).ready(function() {
        var table = $('#tbl2').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [5, 10, 25],
          dom: 'Blfrtip',
          buttons: ['csv','excel', 'pdf', 'print' ]
        } );
    } );
      }
      SetExportControlsthree(){
        $("#tbl3").dataTable().fnDestroy();
        $(document).ready(function() {
          var table = $('#tbl3').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu : [5, 10, 25],
            dom: 'Blfrtip',
            buttons: ['csv','excel', 'pdf', 'print' ]
          } );
      } );
        }
getLeavesRejected(){
  const id = this.empInfoId;
  this.api.getRejectedleaves(this.tokenID)
    .subscribe(res => {
      this.rejectleaves = res;
      this.SetExportControlsthree();
    });
}
//applaied leave
getLeaveApplied(){
  const id = this.empInfoId;
  this.api.getLeaveStatus(this.tokenID)
    .subscribe(res => {
      this.appliedleaves = res;
      this.SetExportControls();
    });
}
  getLeavesRemaining(){
    const id = this.empInfoId;
    this.api.getLeaveBalance(this.tokenID)
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
          this.snk.SendSnackBarMsgSuccess("! Leave applied successfully !");
          this.getCountStatus();
          this.getLeaves();
          this.getLeavesRemaining();
          this.getLeaveApplied();
          this.getApproveLeaves();
          this.getLeavesRejected();
        }),
        error:(err=>{
          this.pgbar.hide();
          this.snk.SendSnackBarMsgDanger(err);
          this.getCountStatus();
          this.getLeaves();
          this.getLeavesRemaining();
          this.getLeaveApplied();
          this.getApproveLeaves();
          this.getLeavesRejected();
        })
      })
    } else {
      this.snk.SendSnackBarMsgDanger("! Please Fill All Filds !");
    }
  }
  maxDate: string = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0]; 
  minDate = new Date(new Date().getTime() + 86400000).toISOString().substring(0, 10);
  
   //get empid
  //  getEmpinfoId(){
  //   this.userStore.getIdFromStore()
  //     .subscribe(val => {
  //       const IdFromToken = this.auth.getIdFromToken();
  //       this.empInfoId = val || IdFromToken;
  //     });
  // }
  getLeaves(){
    const id = this.empInfoId;
    this.api.getLeavesData(this.tokenID)
      .subscribe(res => {
        this.leaves = res[0];
        // console.log(this.leaves);

      });
  }
    //get leave status
    getCountStatus(){
      const id = this.empInfoId;
      this.api.getLeaveCounts(this.tokenID)
        .subscribe(res => {
          this.total=res[0];
          this.approved=res[1];
          this.reject=res[2];
          this.apllied=res[3];
        });
    }
  //get Holiday Detailes
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
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
