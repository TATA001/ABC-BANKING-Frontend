import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent implements OnInit {
  id: string = localStorage.usr;
  loanForm: FormGroup;
  submitted: boolean = false;
  validate: number;
  show: string;
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.loanForm = this.formBuilder.group({
        sel: ['', [Validators.required]],
        loan: ['', [Validators.required, Validators.min(100000), Validators.max(10000000)]],
        asset: ['', [Validators.required, Validators.min(140000)]],
        tenure: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  applyLoan() {
    this.submitted = true;
    if (this.loanForm.invalid) {
      return;
    }
    let type = this.loanForm.controls.sel.value;
    let loan = this.loanForm.controls.loan.value;
    let asset = this.loanForm.controls.asset.value;
    let tenure = this.loanForm.controls.tenure.value;
    let result = confirm("Do you want to Proceed?");
    if (result) {
    this.adminService.loanApply(this.id, loan, asset, tenure, type).subscribe(data => {
      this.loanValidate(data)
    }, error => {
      this.show = error.error;
      alert(error.error);

      if (this.show == "Loan already exist!") {
        this.router.navigate(['user']);
      }

      if (this.show == "Insufficent Account Balance. Loan can't be Processed!") {
        this.router.navigate(['user']);
      }

    });
  }
  else return;
}

  loanValidate(data) {
    this.validate = data;
    if (this.validate == 1) {
      alert("Your Loan has been Sanctioned!");
      this.router.navigate(['user']);
    }
  }
}
