import { Component, OnInit } from '@angular/core';
declare var feather:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    feather.replace();
  }

  

}
