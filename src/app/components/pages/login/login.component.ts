import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import ValidateForm from 'src/app/helpers/validationform';
import { ProgressBarBehaviourSubject } from 'src/app/services/ProgressBarBehaviourSubject.service';
import { SnackBarService } from 'src/app/services/SnackBar.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

export class User {
  public userid!: number;
  public password!: string;
  public usertype!: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ngForm!: FormGroup;
  public role!: string;
  model = new User();
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  fieldTextType: boolean | any;

  constructor(private snk: SnackBarService,private router: Router, private auth: AuthService, private userStore: UserStoreService, private fb: FormBuilder, private pgbar: ProgressBarBehaviourSubject, private resetService: ResetPasswordService) { }
  ngOnInit(): void {
    this.ngForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    const token=localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    this.role =  jwtHelper.decodeToken(token!).role;
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  onSubmit() {
    if (this.ngForm.valid) {
      this.pgbar.visible();
      // console.log(this.ngForm.value);
      this.auth.signIn(this.ngForm.value).subscribe({
        next: (res => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.ngForm.reset();
          this.snk.SendSnackBarMsgSuccess("! Login Successfully !");
          this.pgbar.hide();
          if (this.role === 'Employee') {
            this.router.navigate(['user-dashboard'])
          }
          else if (this.role === 'DeptIncharge') {
            this.router.navigate(['dept-dashboard'])
          }
          else if (this.role === 'WageIncharge') {
            this.router.navigate(['wages-dashboard'])
          }
          else if (this.role === 'Doctor') {
            this.router.navigate(['doctor-dashboard'])
          }
          else {
            this.router.navigate(['login']);
            this.snk.SendSnackBarMsgDanger("! Invalid Role !");
          }
        }),
        error: (err) => {
          this.pgbar.hide();
          this.snk.SendSnackBarMsgDanger(err);
        },
      });
    } else {
      this.pgbar.hide();
      localStorage.clear();
      this.snk.SendSnackBarMsgDanger("! Please Fill Data !");
    }
  }
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);


      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.resetPasswordEmail = "";
            const buttonRef = document.getElementById("closeBtn");
            buttonRef?.click();
          },
          error: (err) => {
            alert(err.error.message);
          }
        })
    }
  }

}
