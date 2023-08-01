import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'about', component:AboutUsComponent},
  { path: 'contact', component:ContactUsComponent},
  { path: 'user', component:  UserDetailsComponent, children:[
    {path: '', component: AccountDetailsComponent },
    {path: 'account', component:  AccountDetailsComponent},
    {path: 'balance',component: AccountBalanceComponent},
    {path: 'deposit', component: DepositComponent},
    {path: 'applyLoan', component: ApplyLoanComponent},
    {path: 'calEmi', component: CalcEmiComponent},
    {path: 'payEmi', component: PayEmiComponent},
    {path: 'foreclose', component: ForcloseComponent},
    {path: 'ptrans', component: PrintTransComponent},
    {path:'change-pass', component:ChangePasswordComponent},
    {path:'**', redirectTo: '/user', pathMatch: 'full'}]},
  {path: 'admin-home', component:AdminHomeComponent, children:[
    {path: '', component:  AdminUserListComponent},
    {path:'user-list', component:AdminUserListComponent},
    {path:'admin-edit/:id', component:AdminEditComponent},
    {path:'**', redirectTo: '/admin-home', pathMatch: 'full'}]},
  {path:'set',component:SetPasswordComponent},
  {path:'forget',component:ForgetPasswordComponent},
  {path:'**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
