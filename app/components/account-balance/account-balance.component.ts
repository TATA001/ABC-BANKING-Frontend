import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {
  users=[];
  currentId: string = localStorage.usr;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.adminService.getUserById(this.currentId).subscribe(data => {
        this.accountHandler(data)
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  accountHandler(data) {
    this.users = data;
  }

}
