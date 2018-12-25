import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import {NodeapiService} from '../../nodeapi.service'
declare var feather:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
  ishome:boolean;
  isorderstatus:boolean;
  ispaymentmode:boolean;
  issupplierdetail:boolean;
  isCustomer:boolean;
  order:any;
  products:any;
  bundle_arr:any;
  
  orders:any;
  order_status:any;
  constructor(private adminApi: AdminApiService,private node:NodeapiService) {
    this.orders =[]
    this.getOrder();
    this.bundle_arr = [];
   }

  ngOnInit() {
    this.home();
    
  }

  home(){
    this.ishome=true;
    this.isorderstatus=false;
    this.ispaymentmode=false;
    this.issupplierdetail=false;
    this.isCustomer=false;
  }

  isOrderStatus(){
    this.ishome=false;
    this.isorderstatus=true;
    this.ispaymentmode=false;
    this.issupplierdetail=false;
    this.isCustomer=false;
  }

  isPaymentMode(){
    this.ishome=false;
    this.isorderstatus=false;
    this.ispaymentmode=true;
    this.issupplierdetail=false;
    this.isCustomer=false;
  }

  isSupplierDetail(){
    this.ishome=false;
    this.isorderstatus=false;
    this.ispaymentmode=false;
    this.issupplierdetail=true;
    this.isCustomer=false;
  }

  is_Customer(){
    this.ishome=false;
    this.isorderstatus=false;
    this.ispaymentmode=false;
    this.issupplierdetail=false;
    this.isCustomer=true;
    this.oderDetail();
  }
  async getOrder(){
    await this.adminApi.getOrdes().subscribe((res)=>{
      this.orders = res['data'];
      console.log(this.orders)
      
    },(err)=>{alert(err)
    console.log(err)
    })
    

  }

  isOrderClick(order){
    console.log(order)
    this.isOrderStatus();
    this.order_status = order['cancel_status'];
    this.order = order;
    this.products = this.order['products'];

    

  }
  onStatusUpdate(){
    console.log(this.order._id)
    console.log(this.order.cancel_status)
    this.adminApi.updateStatus(this.order._id,this.order_status).subscribe(function(result){
      console.log(result)
      if(result['error_code']===200 && result['Message']!=='invalid order id'){
        alert(result['Message'])
      }else if(result['error_code']===200 && result['Message']==='invalid order id'){
        alert(result['Message'])
      }else{
        alert("Please try again");
      }
    })

  }

  oderDetail(){
    for(let product of this.products){
      console.log(product['bundle_id'])
      this.adminApi.getProductDetail(product['bundle_id']).subscribe((res)=>{
        this.bundle_arr.push(res['data'][0])

      })
    }
    console.log(this.bundle_arr)
  }
  rejectOrder(element){
    this.node.changeOrderStatus(element,"Reject").subscribe((result)=>{
      alert("Order Rejected")
      
      window.location.reload();
    },(err)=>{
      alert("Please try again")
    })
  }

}
