import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
// const Json2csvParser = require('json2csv').Parser;
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';

declare var feather:any;
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.sass']
})
export class AllOrdersComponent implements OnInit {
  loading = false;
  orders: any;
  name:any;
  wired_doc_arr:any;
  purchase_order:any;
  order:any;
  isorderlist:boolean;
  ispaymentdetails:boolean;
  cancel_status:boolean;
  ispurchaseorder:boolean;
  isorderdetail:boolean;
  isupload:boolean;
  files:any;
  bool:boolean;
  payment_status:String;
  payment_mode:String;
  isOrderClicked:boolean;
  selectedOrder;

  constructor(private node:NodeapiService,private route:Router,private auth:AuthService, dataservice: DataService) {
    this.isorderdetail=false;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =true
    this.name =[]
    this.wired_doc_arr = []
    this.order = []
    this.files = []
    this.bool = true
    this.isOrderClicked = false;

    if (dataservice.getOption()) {

      this.selectedOrder = dataservice.getOption()['selectedOrder'];

      this.orderDetail1(this.selectedOrder);

    }

  }

  ngOnInit() {
    feather.replace();
    this.loading = true;

    this.node.getOrder().subscribe((result)=>{
      if(result['error_code']===401){
        Swal({
          text: 'please login',
          type: 'info',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
        this.route.navigate(['/login'])
      }
      else if(result['error_code']===200){
        if(result['message']!=="No order"){
          this.orders = result['data'];
          for(let item of this.orders){
            console.log('item',item);
            this.node.getCustomerName(item.user_id).subscribe((res)=>{
              this.name.push(res['data'])


            })
          }console.log('name',this.name)
          console.log(result)
  }else if(result['message']==="No order"){

    Swal({
      text: 'Order list is empty.',
      type: 'info',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });


  }else{

    Swal({
      text: 'Please try again',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
  }




      }
      this.loading = false;

    })
    console.log(this.orders)
  }


  orderDetailTab(){
    this.isorderdetail=true;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =false

  }


  purchaseOrderTab(){
    this.isorderdetail=false;
    this.ispaymentdetails=false
    this.ispurchaseorder=true
    this.isupload = false
    this.isorderlist =false
    this.getPurchaseOrder();
  }

  paymentDetailTab(){
    this.isorderdetail=false;
    this.ispaymentdetails=true
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =false
    this.getWiredDoc();

  }

  shippingDetailUploadTab(){
    this.isorderdetail=false;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = true
    this.isorderlist =false
  }



  orderDetail1(doc){
    this.isorderdetail=true;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =false
    this.order = doc;
    console.log(doc)
    if(doc['cancel_status']==="Accepted"){
      this.cancel_status = false
    }else{
      this.cancel_status = true
    }

    console.log(this.orders)
    this.isOrderClicked = true;


  console.log(this.order)
  }

  allFilesToUpload(event){
    console.log("event",event.target.labels[0])
    // document.getElementById('inputGroupFile07_label').innerText = event.target.files[0]['name'];
    event.target.labels[0].innerText = event.target.files[0]['name'];
    this.files.push(<File>event.target.files)
    console.log(this.files)

  }

  acceptOrder(element){

    this.loading = true;

    this.node.changeOrderStatus(this.order._id,"Accepted").subscribe((result)=>{
      Swal({
        text: 'Order Accepted',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    this.loading = false;

      element.disabled = true;
      this.bool = false;
      this.route.navigate(['/supplier']);
    },(err)=>{
      Swal({
        text: 'Please try again.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    this.loading = false;

    })
  }

  rejectOrder(element){
    this.loading = true;

    this.node.changeOrderStatus(this.order._id,"Reject").subscribe((result)=>{
      Swal({
        text: 'Order Rejected',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    this.loading = false;

      element.disabled = true;
      this.bool =false;
      this.route.navigate(['/supplier']);

    },(err)=>{
      Swal({
        text: 'Please try again',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    this.loading = false;

    })
  }



  uploadShippingDoc(){

    const formData:any = new FormData();
    // formData.append('shipping_file', this.files);
    formData.append( "_id",this.order._id)
    formData.append("supplier_id",this.auth.getUser()._id)
    const file: Array<File> = this.files;
    console.log("shipping",this.order)
    if(file.length>0){
    for(let i =0; i < file.length; i++){

      formData.append("shipping_file", file[i][0], file[i][0]['name']);
  }

  console.log('form data variable :   '+ formData.toString());

  console.log('order',this.order)
    let data = {
      "_id":this.order._id,
      "supplier_id":this.order.supplier_id,
      "shipping_doc":this.files

    }
    this.loading = true;
    this.node.uploadShippingDoc(formData).subscribe((res)=>{
      console.log(res);
      Swal({
        text: res['message'],
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    this.loading = false;

    })
  }else{
    Swal({
      text: 'Please select the shipment document.before uploading.',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
  }
}


getWiredDoc(){

  this.loading = true;


  this.node.downloadWiredDoc(this.order._id).subscribe((res)=>{
    console.log('zz',res['data'])
    this.payment_status = res['data']['payment_status'];
    this.wired_doc_arr = res['data']['docs'];
    this.payment_mode = res['data']['payment_mode'];
    this.loading = false;

  },(err)=>{
    Swal({
      text: 'Please try again later',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
    this.loading = true;

  })
  console.log(this.payment_status)
}

getPurchaseOrder(){
  this.loading = true;
  this.node.downloadPurchaseOrder(this.order._id).subscribe((res)=>{
    console.log('zz',res)
    // this.payment_status = res['data']['payment_status'];
    this.purchase_order = res['data'].length > 0 ? res['data'][0]['path'] : undefined;
    // this.payment_mode = res['data']['payment_mode'];
    this.loading = false;

  },(err)=>{
    Swal({
      text: 'Please try again later.',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
    this.loading = false;

  })
  console.log("purchase_order",this.purchase_order)
}

}


