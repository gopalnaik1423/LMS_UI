import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { LeaveComponent } from './components/user/leave/leave.component';
import { PolicyComponent } from './components/user/policy/policy.component';
import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorReportComponent } from './components/doctor/doctor-report/doctor-report.component';
import { DoctorPolicyComponent } from './components/doctor/doctor-policy/doctor-policy.component';
import { SupPolicyComponent } from './components/superwiser/sup-policy/sup-policy.component';
import { SupDashboardComponent } from './components/superwiser/sup-dashboard/sup-dashboard.component';
import { SupReportComponent } from './components/superwiser/sup-report/sup-report.component';
import { WagesPolicyComponent } from './components/wageincharge/wages-policy/wages-policy.component';
import { WagesDashboardComponent } from './components/wageincharge/wages-dashboard/wages-dashboard.component';
import { WagesReportComponent } from './components/wageincharge/wages-report/wages-report.component';
import { DeptPolicyComponent } from './components/deptincharge/dept-policy/dept-policy.component';
import { DeptDashboardComponent } from './components/deptincharge/dept-dashboard/dept-dashboard.component';
import { DeptReportComponent } from './components/deptincharge/dept-report/dept-report.component';
import { DeptAddleavesComponent } from './components/deptincharge/dept-addleaves/dept-addleaves.component';
import { DeptTotalleavesComponent } from './components/deptincharge/dept-totalleaves/dept-totalleaves.component';
import { LoginComponent } from "./components/pages/login/login.component";
import { ProfileComponent } from './components/pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetpasswordComponent } from './components/pages/resetpassword/resetpassword.component';
import { WagesAddpersonsComponent } from './components/wageincharge/wages-addpersons/wages-addpersons.component';


const routes: Routes = [
  

  // user routing pages of the project 
  { path: 'user-dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-leave', component: LeaveComponent, canActivate: [AuthGuard] },
  { path: 'user-policy', component: PolicyComponent, canActivate: [AuthGuard] },
  //doctor roting page
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor-report', component: DoctorReportComponent, canActivate: [AuthGuard] },
  { path: 'doctor-policy', component: DoctorPolicyComponent, canActivate: [AuthGuard] },

  //superincharge roting page
  { path: 'superwiser-dashboard', component: SupDashboardComponent, canActivate: [AuthGuard] },
  { path: 'superwiser-report', component: SupReportComponent, canActivate: [AuthGuard] },
  { path: 'superwiser-policy', component: SupPolicyComponent, canActivate: [AuthGuard] },
  //wagesincharge roting page
  { path: 'wages-dashboard', component: WagesDashboardComponent, canActivate: [AuthGuard] },
  { path: 'wages-addperson', component: WagesAddpersonsComponent, canActivate: [AuthGuard] },
  { path: 'wages-report', component: WagesReportComponent, canActivate: [AuthGuard] },
  { path: 'wages-policy', component: WagesPolicyComponent, canActivate: [AuthGuard] },
  //deptincharge roting page
  { path: 'dept-dashboard', component: DeptDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dept-report', component: DeptReportComponent, canActivate: [AuthGuard] },
  { path: 'dept-policy', component: DeptPolicyComponent, canActivate: [AuthGuard] },
  { path: 'dept-addleaves', component: DeptAddleavesComponent, canActivate: [AuthGuard] },
  { path: 'dept-totalemployees', component: DeptTotalleavesComponent, canActivate: [AuthGuard] },
  // { path: 'dept-noofpresent', component: DeptNoofpresentComponent, canActivate: [AuthGuard] },
  //login page
  { path: 'login', component: LoginComponent },
  //profile page
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  //reset password component
  { path: 'reset', component: ResetpasswordComponent },
  { path: '**', redirectTo:'login',pathMatch:'full' },
  //contact page
  // { path: 'contact', component: ContactComponent },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
