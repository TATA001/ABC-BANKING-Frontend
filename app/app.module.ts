import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountBalanceComponent } from './components/account-balance/account-balance.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { ApplyLoanComponent } from './components/apply-loan/apply-loan.component';
import { CalcEmiComponent } from './components/calc-emi/calc-emi.component';
import { PayEmiComponent } from './components/pay-emi/pay-emi.component';
import { ForcloseComponent } from './components/forclose/forclose.component';
import { PrintTransComponent } from './components/print-trans/print-trans.component';
import { SearchPipe } from './pipes/search.pipe';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TransPipe } from './pipes/trans.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserDetailsComponent,
    AboutUsComponent,
    ContactUsComponent,
    AccountDetailsComponent,
    AccountBalanceComponent,
    DepositComponent,
    ApplyLoanComponent,
    CalcEmiComponent,
    PayEmiComponent,
    ForcloseComponent,
    PrintTransComponent,
    SearchPipe,
    AdminHomeComponent,
    AdminEditComponent,
    AdminUserListComponent,
    TransPipe,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    SetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, //ReactiveFormModule for Reactive forms
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
