import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-wages-addpersons',
  templateUrl: './wages-addpersons.component.html',
  styleUrls: ['./wages-addpersons.component.css']
})
export class WagesAddpersonsComponent implements OnInit {
  public addPerson!: FormGroup;
  public fullName: string = "";
  public role!: string;
  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef, public _router: Router,private userStore:UserStoreService, private auth:AuthService,private fb:FormBuilder) { }
  ngOnInit(): void {
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
      this.addPerson = this.fb.group({
        empName: ['', Validators.required],
        empId: ['', Validators.required],
        email: ['', Validators.required],
        country: ['', Validators.required],
        startDate: ['', Validators.required],
        cetagory: ['', Validators.required],
        jobType: ['',Validators.required],
      });
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
