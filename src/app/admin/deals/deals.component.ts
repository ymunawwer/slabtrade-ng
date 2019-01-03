import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.sass']
})
export class DealsComponent implements OnInit {

  deals = [];

  constructor(private adminservice: AdminApiService) { }

  ngOnInit() {

    this.adminservice.getAllDeals().subscribe((result) => {

      console.log('result', result);
      if (result['error_code'] === 200) {

        this.deals = result['data'];

      } else {

        alert('error occured while retriving data');
        return false;

      }

    });


  }

}
