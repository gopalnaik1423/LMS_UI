import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-doctor-policy',
  templateUrl: './doctor-policy.component.html',
  styleUrls: ['./doctor-policy.component.css']
})
export class DoctorPolicyComponent implements OnInit {

public fullName: string = "";
  public role!: string;
  cat!:string;
  public dptEmpId:any;
  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService) { }
  ngOnInit(): void {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    this.dptEmpId = jwtHelper.decodeToken(token!).nameid;
    this.fullName = jwtHelper.decodeToken(token!).unique_name;
    this.role = jwtHelper.decodeToken(token!).role;
    this.cat = jwtHelper.decodeToken(token!).certpublickey;
    console.log("tokenValue-->",this.dptEmpId);
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
