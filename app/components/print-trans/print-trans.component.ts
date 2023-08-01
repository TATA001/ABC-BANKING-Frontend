import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Trans } from '../../models/trans';
import { Router } from '@angular/router';
@Component({
  selector: 'app-print-trans',
  templateUrl: './print-trans.component.html',
  styleUrls: ['./print-trans.component.css']
})
export class PrintTransComponent implements OnInit {

  searchText: any;

  users: Trans[];
  currentId: string = localStorage.usr;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.adminService.getTrans(this.currentId).subscribe(data => {
        this.users = data;
      })
    }
    else {
      this.router.navigate(['login']);
    }
  }

}
