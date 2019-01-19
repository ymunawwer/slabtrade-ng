import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NodeapiService } from '../../nodeapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.sass']
})
export class NewHomeComponent implements OnInit {

  products;
  orders;
  name = [];

  constructor(private node: NodeapiService, private route: Router, private dataservice: DataService) { }

  ngOnInit() {
      this.getAllProducts();
      this.getAllOrders();
  }

  getAllProducts() {

    this.node.getProduct().subscribe((result) => {
      console.log('products', result);
      this.products = result;
    });

  }

  getAllOrders() {
    this.node.getOrder().subscribe((result) => {
      if (result['error_code'] === 401) {
        Swal({
          text: 'please login',
          type: 'info',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
        this.route.navigate(['/login']);
      } else if (result['error_code'] === 200) {
        if (result['message'] !== 'No order') {
          this.orders = result['data'];
          for (let item of this.orders) {
            console.log('item', item);
            this.node.getCustomerName(item.user_id).subscribe((res )=> {
              this.name.push(res['data']);
            });
          }
          console.log('name', this.name);
          console.log('orders', result);
  } else if (result['message'] === 'No order'){

    Swal({
      text: 'Order list is empty.',
      type: 'info',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
  } else {

    Swal({
      text: 'Please try again',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
  }

      }

    });
  }


  orderDetail1(order) {

    this.dataservice.setOption('selectedOrder', order);
    this.route.navigate(['/supplier/orders']);

  }


}
