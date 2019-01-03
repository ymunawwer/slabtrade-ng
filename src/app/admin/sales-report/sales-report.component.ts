import { NodeapiService } from './../../nodeapi.service';
import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.sass']
})
export class SalesReportComponent implements OnInit {

  data = {

    'type': '',
    'status': '',
    'startDate': '',
    'endDate': '',
    'region': '',
    'dateRange': ''

  };

  orders = [];
  ports = [];
  constructor(private adminservice: AdminApiService, private nodeApi: NodeapiService) { }

  ngOnInit() {


  // $('.data-table').DataTable();


  this.adminservice.getSalesReport(this.data).subscribe((data)=> {

    if (data['error_code'] === 200) {

      this.orders = data['data'];

    }

    console.log('data', this.orders);


  });

  }

  filter() {

    const data = this.data;

    this.data.startDate = data.dateRange ? new Date(data.dateRange[0]).getFullYear() + ',' + (new Date(data.dateRange[0]).getMonth() + 1) +
    ',' + new Date(data.dateRange[0]).getDate() : '';

    this.data.endDate = data.dateRange ? new Date(data.dateRange[1]).getFullYear() + ',' + (new Date(data.dateRange[1]).getMonth() + 1) +
    ',' + new Date(data.dateRange[1]).getDate() : '';

    console.log('mydata', this.data);

    if (this.data.dateRange !== '' && this.data.status === '' && this.data.region === '') {

      this.data.type = 'date';

    }


    if (this.data.dateRange === '' && this.data.status !== '' && this.data.region === '') {

      this.data.type = 'status';

    }


    if (this.data.dateRange === '' && this.data.status === '' && this.data.region !== '') {

      this.data.type = 'region';

    }

    if (this.data.dateRange !== '' && this.data.status !== '' && this.data.region === '') {

      this.data.type = 'DS';

    }

    if (this.data.dateRange !== '' && this.data.status === '' && this.data.region !== '') {

      this.data.type = 'DR';

    }

    if (this.data.dateRange === '' && this.data.status !== '' && this.data.region !== '') {

      this.data.type = 'SR';

    }

    if (this.data.dateRange !== '' && this.data.status !== '' && this.data.region !== '') {

      this.data.type = 'DSR';

    }

    console.log('sending data', this.data);

    this.adminservice.getSalesReport(this.data).subscribe((result)=> {

      if (result['error_code'] === 200) {

        this.orders = result['data'];

      }

      console.log('data', this.orders);


    });


  }

  async getPort(value) {


     await this.nodeApi.getPortDetailBycountry(value).subscribe((result) => {
      console.log('list', result);
      this.ports = result['data'];
    });
  }

}
