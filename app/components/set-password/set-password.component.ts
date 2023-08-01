import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  id: string = localStorage.usr;
  passForm: FormGroup;
  submitted: boolean = false;
  newPass: string;
  passValid: number;
  passwordType: string = "password";
  passwordShow: boolean = false;
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.passForm = this.formBuilder.group({
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
    this.newPass = this.passForm.controls.newPass.value;
    let re = this.passForm.controls.confirmPass.value;
    if (this.newPass == re) {
      this.adminService.changePassword(this.id, this.newPass).subscribe(data => { this.passHandler(data) });
    }
    else {
      alert('Password and confirm password should match');
      return;
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
