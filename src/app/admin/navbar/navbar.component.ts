import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onLogout(){
    sessionStorage.removeItem("currentUser");
    window.location.reload();
   
    

  }

}
