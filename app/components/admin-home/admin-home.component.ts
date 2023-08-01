import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.usr != null) {
      this.router.navigate(['/admin-home']);

    }
    else {
      this.router.navigate(['/login']);

    }
  }
  logOut() {
    localStorage.removeItem("usr");
    this.router.navigate(['/login']);
  }

  w3_open() {
    document.getElementById("mySidebar1").style.display = "block";
  }
  
  w3_close() {
    document.getElementById("mySidebar1").style.display = "none";
  }

}
