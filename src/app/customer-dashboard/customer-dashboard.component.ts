import { Component, OnInit } from '@angular/core';
import {NgbModule,NgbCarousel,NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { NodeapiService } from '../nodeapi.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.sass'],
  providers:[NgbCarousel,NgbCollapse]
})
export class CustomerDashboardComponent implements OnInit {
  
  isCollapsed = true
  constructor(private nodeapi:NodeapiService) { }

  ngOnInit() {
    this.getHomePage();
  }

  getHomePage(){
    this.nodeapi.fetchHomePage().subscribe((data)=>{
      console.log(data.data)
    })
  }


}
