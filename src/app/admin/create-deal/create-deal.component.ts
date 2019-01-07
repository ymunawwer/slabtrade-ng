import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.sass']
})
export class CreateDealComponent implements OnInit {
  loading = false;
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

      Swal({
        text: 'All fields are required',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

      return false;

    }

    this.loading = true;

    this.adminservice.createDeal(this.data).subscribe((result) => {

      this.loading = false;


      if (result['error_code'] === 200) {



        Swal({
          text: result['message'],
          type: 'success',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });

        this.router.navigate(['/admin/deals']);

      } else {

        Swal({
          text: 'Error occured while creating',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });

      }


    });

  }

}
