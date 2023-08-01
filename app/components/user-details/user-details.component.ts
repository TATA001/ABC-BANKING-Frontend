import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  users: User = new User();
  currentId: string = localStorage.usr;
  sex: string;
  pic: boolean = false;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {

    if (localStorage.usr != null) {
      this.adminService.getUserById(this.currentId).subscribe(data => {
        this.users = data; this.sex = data.sex;
        if (this.users.sex == 'f') {
          this.pic = true;
        }
      }, err => {
        console.log(err.stack);
      });
      this.router.navigate(['/user/account']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    alert("Thank you for using ABC Banking Services. You will be redirected to Login Screen.");
    localStorage.removeItem("usr");
    this.router.navigate(['/login']);
  }

}
