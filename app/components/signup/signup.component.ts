import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;
  validate: number;
  passwordType: string = "password";
  passwordShow: boolean = false;
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Z][A-Z a-z]{2,30}")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,20}")]],
      userId: ['', [Validators.required, Validators.pattern("[A-Z]{3}[ABCFGHJLPT]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}")]],
      phone_Number: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      sex:['',[Validators.required]],
     // dob:['',[Validators.required]],
      balance_Amount: ['', [Validators.required, Validators.min(50000)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.pattern("[A-Z]{8}")]],
      password: ['', [Validators.required, Validators.pattern("[A-Z]{1}[a-z]{1}[a-zA-Z0-9]{4,8}")]],
    });

    //Removing data from localStorage if exist
    if (localStorage.usr != null) {
      localStorage.removeItem("usr");
    }
  }



  //If form is submitted, addUser method will be called. 
  addUser() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.adminService.addUser(this.addForm.value).subscribe(data => {
      this.signUpHandler(data);
    }, (error) => {
      alert(error.error); 
    })
  }

  signUpHandler(data) {
    this.validate = data;
    if (this.validate == 1) {
      alert(`Hello, ${this.addForm.controls.firstName.value}. Your Account has been created successfully. You will be redirected to login screen`);
      this.router.navigate(['/login']);
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
