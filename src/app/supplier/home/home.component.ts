import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
// const Json2csvParser = require('json2csv').Parser;
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';
declare var feather:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
loading;
product:any;
name:any;
orders: any;
  constructor(private node:NodeapiService) {
    this.name = []
   }

  ngOnInit() {
    feather.replace();
  }

  

}
