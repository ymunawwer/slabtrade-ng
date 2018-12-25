import { Component, OnInit } from '@angular/core';
declare var feather:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    feather.replace();
  }

}
