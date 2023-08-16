import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-wages-report',
  templateUrl: './wages-report.component.html',
  styleUrls: ['./wages-report.component.css']
})
export class WagesReportComponent implements OnInit {
  public report: any = [];
  public empInfoId: string = "";
 public fullName: string = "";
  public role!: string;
  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private api:ApiService) { }
  ngOnInit(): void {
    this.getEmpinfoId();
    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken
      });
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
  }
       //get rejected data
       getLeaveApplied(){
        // const id = this.empInfoId;
        // this.api.getLeaveStatus(id)
        //   .subscribe(res => {
        //     this.report = res;
        //     console.log(this.report);
        //   });
      }
   //get empid
   getEmpinfoId(){
    this.userStore.getIdFromStore()
      .subscribe(val => {
        const IdFromToken = this.auth.getIdFromToken();
        this.empInfoId = val || IdFromToken;
      });
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
