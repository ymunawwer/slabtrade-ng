import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
import { AdminApiService } from '../../admin-api.service';
import { DataService } from './../../services/data.service';


declare var feather:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
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
    this.admin_api.getCount().subscribe((res)=>{
      console.log(res.data);

      this.count = res.data;
      this.count['total_sales']='loading...';
      this.count['day_to_day_sales']='loading...';

    })

  }

  getOrders(){
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

    })


  }


  approveOrder(element){
    console.log(element)
    this.node.changeOrderStatus(element,"Accepted").subscribe((result)=>{
      alert("Order Accepted")
      window.location.reload();

      this.bool = false;
    },(err)=>{
      alert("Please try again.")
    })
  }

  rejectOrder(element){
    this.node.changeOrderStatus(element,"Reject").subscribe((result)=>{
      alert("Order Rejected")
      window.location.reload();
      this.bool =false;
    },(err)=>{
      alert("Please try again")
    })
  }

  orderDetail(order) {

    this.dataservice.setOption('selectedOrder', order);
    this.router.navigate(['/admin/order']);

  }

}
