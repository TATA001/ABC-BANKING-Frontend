import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-forclose',
  templateUrl: './forclose.component.html',
  styleUrls: ['./forclose.component.css']
})
export class ForcloseComponent implements OnInit {

  forcloseForm: FormGroup;
  submitted: boolean = false;
  users = [];
  validate: number;
  currentId: string = localStorage.usr;
  show: string;
  pass:string;
  constructor(private formBuilder: FormBuilder,private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.forcloseForm = this.formBuilder.group(
        {
          password: ['', Validators.required]
        }
      );

      this.adminService.getUserById(this.currentId).subscribe(data => {
        this.accountHandler(data)
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  accountHandler(data) {
    this.users = data;
  }

  loanForeClose() {

    this.submitted = true;
    this.pass = this.forcloseForm.controls.password.value;

    if (this.forcloseForm.invalid) {
      return;
    }

    this.adminService.passValidate(this.currentId, this.pass).subscribe((data) => {
      return this.passwordHandler(data)
    }, (error) => {

      alert("Incorrect Password!");
    });
  }

  passwordHandler(data) {
    this.validate = data;

    if (this.validate == 1) {

    let result = confirm("Do you want to foreclose loan?");

    if (result) {
      this.adminService.loanForeClose(this.currentId).subscribe(data => { this.foreClosureHandler(data) },
        error => {
          this.show = error.error;
          if (this.show == "Transaction Failed due to insufficient funds!") {
            let res = confirm(`Insufficient Funds in your account.\n Do you want to forclosure the Loan forcefully?`);
            if (res) {
              alert(`Your assets have been taken possession by ABC Bank!`);
              this.adminService.forceClose(this.currentId).subscribe();
              alert("Loan Foreclose Successful!");
              this.router.navigate(['user']);
            }
            else {
              alert(`Foreclose process Cancelled!`);
              this.router.navigate(['user']);
            }
          }
          else {
            alert(error.error);
            this.router.navigate(['user']);
          }
        });

    }
  }
}

  foreClosureHandler(data) {
    this.validate = data;
    if (this.validate == 2) {
      alert("Loan Foreclose Successful!");
      this.router.navigate(['user']);
    }
  }

  cancel() {
    alert("Transaction failed!");
    this.router.navigate(['user'])

  }

}
