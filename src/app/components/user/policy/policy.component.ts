import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  cat!:string;
  tokenID!:any;
  public fullName: string = "";
  public role!: string;
  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private api:ApiService) { }
  ngOnInit(): void {
    const token=localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    console.log("token-->",jwtHelper.decodeToken(token!).nameid)
    this.tokenID = jwtHelper.decodeToken(token!).nameid;
    this.api.getUserDetails(token)
    .subscribe(res => {
      this.role=res[0].role;
      this.fullName=res[0].username;  
      this.cat = res[0].category;
      console.log(res);
    });
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
