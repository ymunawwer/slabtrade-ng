import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  userDetails: any;

  constructor() { }

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('currentUser')).user_detail.user_detail;
  }
  onLogout(){
    sessionStorage.removeItem("currentUser");
    window.location.reload();



  }

}
