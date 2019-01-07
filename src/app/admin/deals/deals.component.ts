import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.sass']
})
export class DealsComponent implements OnInit {

  deals = [];
  loading = false;

  constructor(private adminservice: AdminApiService) { }

  ngOnInit() {

    this.loading = true;
    this.adminservice.getAllDeals().subscribe((result) => {

      console.log('result', result);
      if (result['error_code'] === 200) {

        this.deals = result['data'];

      this.loading = false;


      } else {
        this.loading = false;

        Swal({
          text: 'error occured while retriving data',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
        return false;

      }

    });


  }

}
