import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  currentId: string;
  editForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currentId = params['id'];
    })
  }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.editForm = this.formBuilder.group({
        account_Number: [{ value: '', disabled: true }, Validators.required],
        firstName: ['', [Validators.required, Validators.pattern("[A-Z][A-Z a-z]{2,30}")]],
        lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,20}")]],
        userId: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("[A-Z]{3}[ABCFGHJLPT]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}")]],
        phone_Number: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
        email: ['', [Validators.required, Validators.email]],
        userName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("[A-Z a-z]{8}")]],
        balance_Amount: [''],
        loan_Amount: [''],
        loan_Type: [''],
        emi: [''],
        transaction_Count: [''],
        asset_Value: [''],
        password: [''],
        sex: ['']
      });

      this.adminService.getUserById(this.currentId).subscribe(data => {
        this.editForm.setValue(data);
      }, err => {
        console.log(err.stack);
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  addUser() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.adminService.updateUserById(this.editForm.getRawValue()).subscribe(data => {
      alert(`${this.editForm.controls.firstName.value} record updated successfully...!`);
      this.router.navigate(['admin-home/user-list']);
    });
  }

}
