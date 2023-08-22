import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-wages-policy',
  templateUrl: './wages-policy.component.html',
  styleUrls: ['./wages-policy.component.css']
})
export class WagesPolicyComponent implements OnInit {

 public fullName: string = "";
 public role!: string;
 public empInfoId: string = "";
 tokenID!: any;
 cat!: string;
  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private api:ApiService) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    this.tokenID = jwtHelper.decodeToken(token!).nameid;
    this.api.getUserDetails(token)
      .subscribe(res => {
        this.role = res[0].role;
        this.fullName = res[0].username;
        this.cat = res[0].category;
        console.log(res);
      });
  }
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
