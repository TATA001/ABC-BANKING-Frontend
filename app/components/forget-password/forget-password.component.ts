import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  submitted: boolean = false;
  hide: boolean = false;
  validate: string;
  id: string;
  pan: string;
  pass: string;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.pattern("[A-Z]{8}")]],
      accNo: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
      pan: ['', [Validators.required, Validators.pattern("[A-Z]{3}[ABCFGHJLPT]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}")]]
    });

    if (localStorage.usr != null) {
      localStorage.removeItem("usr");
    }
  }

  forgetPass() {
    this.submitted = true;
    if (this.forgetForm.invalid) {
      return;
    }
    this.id = this.forgetForm.controls.user.value;
    let accNo = this.forgetForm.controls.accNo.value;
    this.pan = this.forgetForm.controls.pan.value;
    this.adminService.check(this.id, accNo).subscribe(data => {
      this.passValidate(data)
    },
    error=>{
      alert(error.error);
      this.router.navigate(['login']);
    });
  }

  passValidate(data) {
    this.validate = data;
    if (this.validate == this.pan) {
      localStorage.usr = this.id;
      this.hide = true;
    }
  }

}
