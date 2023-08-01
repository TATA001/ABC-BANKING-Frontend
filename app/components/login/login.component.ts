import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MethodCall } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validate: number;
  submitted: boolean = false;
  usr: string;
  pass: string;
  passwordType: string = "password";
  passwordShow: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        usrid: ['', Validators.required],
        password: ['', Validators.required]
      }
    );

    //Removing the localStorage data if any data exist before login
    if (localStorage.usr != null) {
      localStorage.removeItem("usr");
    }
  }

  /*On submitting the form, VerifyLogin method will be called in which it will 
    validate username and passowrd entered by the user using passValidate method 
    of AdminService.

    The data subscribed from passValidate method is assigned to handler().

    If user entered credentials are not valid, it will show an alert message.
  */
  verifyLogin() {
    this.submitted = true;
    this.usr = this.loginForm.controls.usrid.value;
    this.pass = this.loginForm.controls.password.value;

    if (this.loginForm.invalid) {
      return;
    }
    this.adminService.passValidate(this.usr, this.pass).subscribe((data) => {
      return this.loginHandler(data)
    }, (error) => {

      if (this.usr == "admin" && this.pass == "admin123") {
        localStorage.usr = this.usr;
        this.router.navigate(['/admin-home'])
      }
      else {
        alert(error.error);
      }
    })
  }

  /*The data subscribed from the passValidate method of AdminService is assigned to validate varaible.
    If the validate value equals to 1, then store the username in localStorage and navigate user to 
    account details page.
  */
  loginHandler(data) {
    this.validate = data;

    if (this.validate == 1) {
      localStorage.usr = this.usr;
      this.router.navigate(['/user']);
    }
  }

  //This method is used for property binding
  show() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = "password";
    }
    else {
      this.passwordShow = true;
      this.passwordType = "text";
    }
  }
}
