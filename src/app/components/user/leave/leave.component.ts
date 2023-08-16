import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  public leaves: any = [];
  public ballance: any = [];
  public empInfoId: string = "";
  public fullName: string = "";
  public role!: string;
  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, public _router: Router, private userStore: UserStoreService, private auth: AuthService,private api:ApiService) { }


  ngOnInit(): void {
    this.getUserName();
    this.getRole();
    this.getEmpinfoId();
    this.getLeaves();
    this.getLeavesRemaining();
  }

  //get leaves remaining
  getLeavesRemaining(){
    const id = this.empInfoId;
    this.api.getLeaveBalance(id)
      .subscribe(res => {
        this.ballance = res[0];
        console.log(this.ballance);
      });
  }

  //get leave data
  getLeaves(){
    const id = this.empInfoId;
    this.api.getLeavesData(id)
      .subscribe(res => {
        this.leaves = res[0];
        console.log(this.leaves);
      });
  }


  //get empid
  getEmpinfoId(){
    this.userStore.getIdFromStore()
      .subscribe(val => {
        const IdFromToken = this.auth.getIdFromToken();
        this.empInfoId = val || IdFromToken;
      });
  }
  //get username
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
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
