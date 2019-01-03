import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.sass']
})
export class CreateDealComponent implements OnInit {

  data = {
    'dateRange': '',
    'start_date': '',
    'end_date': '',
    'offer_value': '',
    'product_type': ''
  };

  constructor(private adminservice: AdminApiService, private router: Router) { }

  ngOnInit() {
  }

  addDeal() {

    console.log('my data', this.data);

    const data = this.data;

    this.data.start_date = data.dateRange ? new Date(data.dateRange[0]).getFullYear() + '-' + (new Date(data.dateRange[0]).getMonth() + 1) +
    '-' + new Date(data.dateRange[0]).getDate() : '';

    this.data.end_date = data.dateRange ? new Date(data.dateRange[1]).getFullYear() + '-' + (new Date(data.dateRange[1]).getMonth() + 1) +
    '-' + new Date(data.dateRange[1]).getDate() : '';

    if (this.data.dateRange === '' || this.data.offer_value === '' || this.data.product_type === '') {

      alert('All fields are required');

      return false;

    }

    this.adminservice.createDeal(this.data).subscribe((result) => {

      if (result['error_code'] === 200) {

        alert(result['message']);

        this.router.navigate(['/admin/deals']);

      } else {

        alert('Error occured while creating');

      }


    });

  }

}
