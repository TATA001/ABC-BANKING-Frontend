import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calc-emi',
  templateUrl: './calc-emi.component.html',
  styleUrls: ['./calc-emi.component.css']
})
export class CalcEmiComponent implements OnInit {

  emiForm: FormGroup;
  submitted: boolean = false;
  emi: number = 0.0;
  rate: number = 0.0;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.emiForm = this.formBuilder.group({
        sel: ['', [Validators.required]],
        loan: ['', [Validators.required, Validators.min(100000), Validators.max(10000000)]],
        tenure: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  calEMI() {
    this.submitted = true;
    if (this.emiForm.invalid) {
      return;
    }
    let type = this.emiForm.controls.sel.value;
    let loan = this.emiForm.controls.loan.value;
    let tenure = this.emiForm.controls.tenure.value;

    if (type == "Home Loan") { this.rate = 8.69; }

    if (type == "Business Loan") { this.rate = 13.5; }

    if (type == "Gold Loan") { this.rate = 8.13; }

    if (type == "Vehicle Loan") { this.rate = 7.43; }

    if (type == "Education Loan") { this.rate = 10.7; }

    if (type == "Personal Loan") { this.rate = 10.85; }

    this.emi = Math.ceil((loan + (loan * this.rate * tenure) / 100) / (tenure * 12));
    this.invalidLogin = true;
  }
  invalidLogin: boolean = false;
}
