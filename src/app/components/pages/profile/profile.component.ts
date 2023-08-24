import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { PasswordReset } from 'src/app/models/password-reset.model';
import { ProgressBarBehaviourSubject } from 'src/app/services/ProgressBarBehaviourSubject.service';
import { SnackBarService } from 'src/app/services/SnackBar.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   userinfo: any = [];
   role!: string;
   firstName!: string;
   email!: string ;
   UserName!: string ;
   Phone!: string;
   DB!: string ;
   JoinigDate!: string;
   cat!:string;
   lastName!:string;
   address!:string;
   
  // public UserName: string = "";
  
  public empInfoId: string = "";
  passwordResetForm!: FormGroup;
  passwordResetObj = new PasswordReset();
  fieldTextType1: boolean | any;
  fieldTextType2: boolean | any;

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, public _router: Router, private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private fb: FormBuilder, private activedRoute: ActivatedRoute, private resetService: PasswordResetService,private pgbar:ProgressBarBehaviourSubject,private snk:SnackBarService) { 
    
  }

  ngOnInit():void {
  const token=localStorage.getItem('token');
  // console.log(token);
  this.api.getUserDetails(token)
  .subscribe(res => {
    this.firstName = res[0].firstname;
    this.role=res[0].role;
    this.email=res[0].email;
    this.UserName=res[0].username;
    this.DB = res[0].dateofBirth;
    this.JoinigDate = res[0].dateofJoin;
    this.cat = res[0].category;
    this.lastName = res[0].lastname;
    this.Phone = res[0].phone;
    this.address=res[0].address;

    //console.log(this.users);
  });
    var emaildata=this.email;
    this.passwordResetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        Validators: ConfirmPasswordValidator("password", "confirmPassword")
      });
  }

  //hide the password
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  resetpassword() {
    if (this.passwordResetForm.valid) {
      console.log(this.passwordResetForm)
      this.pgbar.visible();
      this.passwordResetObj.email = this.email;
      this.passwordResetObj.newPassword = this.passwordResetForm.value.password;
      this.passwordResetObj.confirmPassword = this.passwordResetForm.value.confirmPassword;
      debugger
      this.resetService.newpasswordReset(this.passwordResetObj)
      .subscribe({
        next:(res=>{
          this.passwordResetForm.reset();
          this.pgbar.hide();
          this.snk.SendSnackBarMsgSuccess("Successfully Password Reset!");
        }),
        error:(err=>{
          this.passwordResetForm.reset();
          this.pgbar.hide();
          this.snk.SendSnackBarMsgDanger(err.message);
        })
      })
    } else {
      ValidateForm.validateAllFormFields(this.passwordResetForm);
      const errorMessage = `Please fill in the following fields`;
      this.snk.SendSnackBarMsgDanger(errorMessage);
    }
  }

  goBack() {
    window.history.back();
  }

}
