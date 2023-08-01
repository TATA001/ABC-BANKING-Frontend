import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})

export class AccountDetailsComponent implements OnInit {
  currentId: string = localStorage.usr;
  users = [];
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.adminService.getUserById(this.currentId).subscribe(data => {
        this.accountHandler(data)
      }, error => {
        alert(error.error);
      });

      this.router.navigate(['/user/account']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  accountHandler(data) {
    this.users = data;
  }

}
