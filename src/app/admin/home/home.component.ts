import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
import { AdminApiService } from '../../admin-api.service';
import { DataService } from './../../services/data.service';
import Swal from 'sweetalert2';


declare var feather:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  loading = false;
  count:any;
  pendingOrder:any;
  approvedOrder:any;
  bool:boolean;
  constructor(private admin_api:AdminApiService,private node:NodeapiService, private dataservice: DataService, private router: Router) {
    this.count = {
      'total_sales':'loading...',
      'customer_count':'loading...',
      'supplier_count':'loading...',
      'day_to_day_sales':'loading...'
    }
    this.pendingOrder = [];
    this.approvedOrder = [];
     this.getOrders();
    this.getCount();






   }

  ngOnInit() {
    feather.replace();

  }

  getCount(){
    this.loading = true;
    this.admin_api.getCount().subscribe((res)=>{
      console.log(res.data);

      this.count = res.data;
      this.count['total_sales']='loading...';
      this.count['day_to_day_sales']='loading...';

    this.loading = false;


    })

  }

  getOrders(){

    this.loading = true;

    this.admin_api.getOrdes().subscribe((res)=>{
      console.log(res);


      res['data'].forEach(element => {

        if(element['cancel_status']==='Accepted'){
          this.approvedOrder.push(element)

        }else if(element['cancel_status']==='Pending'){
          this.pendingOrder.push(element)

        }

      });
      console.log('pending',this.pendingOrder)
      console.log('accepted',this.approvedOrder)

    this.loading = false;


    })


  }


  approveOrder(element){
    console.log(element)
    this.loading = true;

    this.node.changeOrderStatus(element,"Accepted").subscribe((result)=>{
      Swal({
        text: 'Order Accepted',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      window.location.reload();

      this.bool = false;
    this.loading = false;

    },(err)=>{
    this.loading = false;
      Swal({
        text: 'Please try again.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    })
  }

  rejectOrder(element){
    this.loading = true;
    this.node.changeOrderStatus(element,"Reject").subscribe((result)=>{
      Swal({
        text: 'Order rejected.',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      window.location.reload();
      this.bool =false;
    this.loading = false;

    },(err)=>{
    this.loading = false;
      Swal({
        text: 'Please try again.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    })
  }

  orderDetail(order) {

    this.dataservice.setOption('selectedOrder', order);
    this.router.navigate(['/admin/order']);

  }

}
