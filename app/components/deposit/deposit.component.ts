import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  id: string = localStorage.usr;
  depositForm: FormGroup;
  submitted: boolean = false;
  validate:number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.depositForm = this.formBuilder.group(
        {
          deposit: ['', [Validators.required, Validators.min(1000), Validators.max(100000)]]
        }
      );
    }
    else {
      this.router.navigate(['login']);
    }
  }
  verifyDeposit() {
    this.submitted = true;
    if (this.depositForm.invalid) {
      return;
    }

    let user = this.depositForm.controls.deposit.value;
    let result = confirm("Do you want to Proceed?");
    if (result) {
      this.adminService.depositAmt(this.id, user).subscribe(data=> this.depositHandler(data),err => {
        console.log(err.stack);
      });
      
    }
    else {
      return;
    }
  }

  depositHandler(data)
  {
    this.validate=data;
    if(this.validate == 1)
    {
      alert(`Rs.${this.depositForm.controls.deposit.value} Deposited Successfully!`);
      this.router.navigate(['user']);
    }
  }

}
