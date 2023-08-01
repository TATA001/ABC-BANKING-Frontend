import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrls: ['./pay-emi.component.css']
})
export class PayEmiComponent implements OnInit {

  emiForm: FormGroup;
  submitted: boolean = false;
  users = [];
  currentId: string = localStorage.usr;
  validate: number;
  pass: string;
  valid: number;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.emiForm = this.formBuilder.group(
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

  payEmi() {
    this.submitted = true;
    this.pass = this.emiForm.controls.password.value;

    if (this.emiForm.invalid) {
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
      let result = confirm("Do you want to Proceed?");
      if (result) {
        this.adminService.payEmi(this.currentId).subscribe(data => {
          this.emiHandler(data)
        }, error => {
          alert(error.error);
          this.router.navigate(['user']);
        }
        );
      }
    }
  }

  emiHandler(data) {
    this.validate = data;

    if (this.validate == 1) {
      alert("EMI payment Successful!");
      this.router.navigate(['user']);
    }
  }
  cancel() {
    alert("Transaction failed");
    this.router.navigate(['user']);
  }
}
