import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressBarBehaviourSubject } from 'src/app/services/ProgressBarBehaviourSubject.service';
import { SnackBarService } from 'src/app/services/SnackBar.service';
import { ApiService } from 'src/app/services/api.service';
import { ApplyLeaveService } from 'src/app/services/apply-leave.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-wages-control',
  templateUrl: './wages-control.component.html',
  styleUrls: ['./wages-control.component.css']
})
export class WagesControlComponent implements OnInit {
  public ngForm!: FormGroup;
  public fullName: string = "";
  public role!: string;
  public empInfoId: string = "";
  tokenID!: any;
  cat!: string;
  file1!: File;
  file2!: File;
  file3!: File;
  uploadFile1: any = FormGroup;
  uploadFile2: any = FormGroup;
  uploadFile3: any = FormGroup;
  submitted = false;
  constructor(private snk: SnackBarService, @Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, public _router: Router, private userStore: UserStoreService, private auth: AuthService, private fb: FormBuilder, private pgbar: ProgressBarBehaviourSubject, private applayServ: ApplyLeaveService, private api: ApiService,private formb:FormBuilder) {

  }
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
      this.uploadFile1 = this.formb.group({
        file1: ['', [Validators.required]]
      });
      this.uploadFile2 = this.formb.group({
        file2: ['', [Validators.required]]
      });
      this.uploadFile3 = this.formb.group({
        file3: ['', [Validators.required]]
      });
  }
  get f1() { return this.uploadFile1.controls; }
  get f2() { return this.uploadFile2.controls; }
  get f3() { return this.uploadFile3.controls; }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  onFileChange1(event: any) {
    this.file1 = event.target.files[0];
  }
  uploadingFile1() {
    this.submitted=true;
    if (this.file1) {
      this.applayServ.UploadUserFromExcel(this.file1).subscribe({
        next: (res => {
          this.uploadFile1.reset();
          this.snk.SendSnackBarMsgSuccess("User Data Uploaded Succesfully");
        }),
        error: (err => {
          console.log(err);
          this.snk.SendSnackBarMsgDanger(err);
          this.uploadFile1.reset();
        })
      });
    } else {
      this.snk.SendSnackBarMsgWarning('No file selected.');
    }
  }
  onFileChange2(event: any) {
    this.file2 = event.target.files[0];
  }
  uploadingFile2() {
    if (this.file2) {
      this.applayServ.uploadEmpInfoFromExcel(this.file2).subscribe({
        next: (res => {
          this.uploadFile2.reset();
          this.snk.SendSnackBarMsgSuccess("EmpInfo data saved successfully.");
        }),
        error: (err => {
          this.uploadFile2.reset();
          this.snk.SendSnackBarMsgDanger(err);
        })
      });
    } else {
      this.snk.SendSnackBarMsgWarning('No file selected.');
    }
  }
  onFileChange3(event: any) {
    this.file3 = event.target.files[0];
  }
  uploadingFile3() {
    if (this.file3) {
      this.applayServ.postleaveData(this.file3).subscribe({
        next: (res => {
          this.uploadFile3.reset();
          this.snk.SendSnackBarMsgSuccess("Leave Data Saved Successfully");
        }),
        error: (err => {
          this.uploadFile3.reset();
          this.snk.SendSnackBarMsgDanger(err);
        })
      });
    } else {
      this.snk.SendSnackBarMsgWarning('No file selected.');
    }
  }
}
