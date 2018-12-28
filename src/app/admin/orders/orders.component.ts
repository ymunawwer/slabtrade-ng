import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import {NodeapiService} from '../../nodeapi.service'
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
declare var feather:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
  ishome:boolean;
  payment;
  isorderstatus:boolean;
  ispaymentmode:boolean;
  issupplierdetail:boolean;
  isCustomer:boolean;
  order:any;
  products:any;
  bundle_arr:any;
  file:any;
  doc_arr:any;
  paymentstatus;
  orders:any;
  order_status:any;
  selectedOrder: any;
  constructor(private adminApi: AdminApiService,private node:NodeapiService,private router:Router, private dataservice: DataService) {
    this.orders =[]
    this.getOrder();
    this.file = []
    this.bundle_arr = [];

    this.selectedOrder = {};

    console.log('selected order', dataservice.getOption());

    if (dataservice.getOption()) {

      this.selectedOrder = dataservice.getOption()['selectedOrder'];

      this.isOrderClick(this.selectedOrder);

    }


   }

  ngOnInit() {

    if (JSON.stringify(this.selectedOrder) === '{}') {

    this.home();


    }


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
    this.adminApi.getShippingDoc(this.order['_id']).subscribe((res)=>{
      this.doc_arr = res['data'];
      console.log(this.doc_arr)

    })
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
    this.payment = order['payment'];
    this.paymentstatus = order['payment_status']
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

    // this.doc_arr =
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


  wiredDocUpload(){


      const formData:any = new FormData();
      const file: Array<File> = this.file;


      // formData.append("bundle_data",this.bundle)
      for(let i =0; i < file.length; i++){

        formData.append("wired_file", file[i][0], file[i][0]['name']);
    }

      // console.log("bundle",this.bundle)
      this.adminApi.uploadWiredDoc(this.order['_id'],formData).subscribe((res)=>{
        // console.log("success")
        alert("Successfully Uploaded");

      },(err)=>{
        alert('Upload Failed.Please try again.');
      })
    }


  allFilesToUpload(event){


    // document.getElementById('inputGroupFile07_label').innerText = event.target.files[0]['name'];

    this.file.push(<File>event.target.files)


  }

  remove(index){
    this.file[index] = null;

  }


  updateStatus(){

    this.adminApi.statusPaymentUpdate(this.order['_id'],this.paymentstatus,this.payment).subscribe((res)=>{
      // console.log("success")
      alert("Successfully Updated");

    },(err)=>{
      alert('Upload Failed.Please try again.');
    })


  }




}
