import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  emailToken!:string;
  emailToReset!:string;
  resetPasswordForm!:FormGroup;
  resetPasswordObj=new ResetPassword();


  constructor(private fb:FormBuilder,private activedRoute:ActivatedRoute,private resetService:ResetPasswordService,private route:Router) { }

  ngOnInit(): void {
    this.resetPasswordForm=this.fb.group({
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    },{
      validator:ConfirmPasswordValidator("password","confirmPassword")
    });

    this.activedRoute.queryParams.subscribe(val=>{
      this.emailToReset=val['email'];
      // this.emailToken=val['code'];
      let uriToken=val['code'];
      this.emailToken=uriToken.replace(/ /g,'+');
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }

  reset(){
    debugger
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email=this.emailToken;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken=this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          alert("Successfully Password Reset!");
          this.route.navigate(['/login']);
        },
        error:(err)=>{
          alert(err.error.message);
        }
      })



    }else{
    ValidateForm.validateAllFormFields(this.resetPasswordForm);
  }
  }



}


