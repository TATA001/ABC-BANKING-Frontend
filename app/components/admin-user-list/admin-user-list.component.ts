import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  searchText: any;

  users: User[];
  count:number;
  balance:number;
  loan:number;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.adminService.getAllUsers().subscribe(data => {
        this.users = data;
        this.count=this.users.length;
      },error=>{
        alert(error.error);
        this.count=0;
      });

      this.adminService.totalBalance().subscribe(data =>{this.balanceHandler(data);},error=>
      {
        this.balance=0;
      })

      this.adminService.totalLoan().subscribe(data =>{this.loanHandler(data);},error=>
      {
        this.loan=0;
      })
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  balanceHandler(data)
  {
    this.balance=data;
  }

  loanHandler(data)
  {
    this.loan=data;
  }

  editUser(user: { userName: any; }) {
    this.router.navigate(['admin-home/admin-edit', user.userName]);
  }

  deleteUser(user: User): void {
    let result = confirm("Do you want to delete user?");
    if (result) {
      if(user.loan_Amount<0)
      {
        alert("Account has Pending Loans! Action can't be done.");
        return;
      }
      this.adminService.deleteUserById(user.userName).subscribe(data => {
        this.users = this.users.filter(u => u !== user);
        this.count=this.users.length;
        this.adminService.totalBalance().subscribe(data =>{this.balanceHandler(data);},error=>
        {
          this.balance=0;
        })
        this.adminService.totalLoan().subscribe(data =>{this.loanHandler(data);},error=>
        {
          this.loan=0;
        })
      }, err => {
        console.log(err.stack);
      });
      alert(`${user.firstName} record deleted!`);
    }

  }
}
