import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  id: string = localStorage.usr;
  passForm: FormGroup;
  submitted: boolean = false;
  validate: number;
  newPass: string;
  passValid: number;
  passwordType: string = "password";
  passwordShow: boolean = false;
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.passForm = this.formBuilder.group({
        pass: ['', [Validators.required]],
        newPass: ['', [Validators.required, Validators.pattern("[A-Z]{1}[a-z]{1}[a-zA-Z0-9]{4,8}")]],
        confirmPass: ['', [Validators.required]]
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  changePass() {
    this.submitted = true;
    if (this.passForm.invalid) {
      return;
    }
    let pass = this.passForm.controls.pass.value;
    this.newPass = this.passForm.controls.newPass.value;
    let re = this.passForm.controls.confirmPass.value;
    if (pass != this.newPass && this.newPass == re) {
      this.adminService.passValidate(this.id, pass).subscribe(data => {
        this.passValidate(data)
      }, error => {
        alert(`Current password is not correct!`);
      });
    }
    else if (re != this.newPass) {
      alert('Password and confirm password should match');
      return;
    }
    else {
      alert(`Your new password must be different from your old password`);
      return;
    }
  }

  passValidate(data) {
    this.validate = data;
    if (this.validate == 1) {
      this.adminService.changePassword(this.id, this.newPass).subscribe(data => { this.passHandler(data) });
    }
  }

  passHandler(data) {
    this.passValid = data;
    if (this.passValid == 1) {
      alert(`Password has been changed successfully. You will be redirected to login screen.`);
      this.router.navigate(['login']);
    }
  }

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
