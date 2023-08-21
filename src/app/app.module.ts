
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetpasswordComponent } from './components/pages/resetpassword/resetpassword.component';
import { WagesAddpersonsComponent } from './components/wageincharge/wages-addpersons/wages-addpersons.component';
import {DataTablesModule} from 'angular-datatables';
import { WagesControlComponent } from './components/wageincharge/wages-control/wages-control.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    LeaveComponent,
    PolicyComponent,
    DoctorDashboardComponent,
    DoctorReportComponent,
    DoctorPolicyComponent,
    SupPolicyComponent,
    SupDashboardComponent,
    SupReportComponent,
    WagesPolicyComponent,
    WagesDashboardComponent,
    WagesReportComponent,
    DeptPolicyComponent,
    DeptDashboardComponent,
    DeptReportComponent,
    DeptAddleavesComponent,
    DeptTotalleavesComponent,
    LoginComponent,
    ProfileComponent,
    ResetpasswordComponent,
    WagesAddpersonsComponent,
    WagesControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
