import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
// const Json2csvParser = require('json2csv').Parser;
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

declare var feather:any;
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.sass']
})
export class AllOrdersComponent implements OnInit {
  orders:any;
  name:any;
  order:any;
  isorderlist:boolean;
  ispaymentdetails:boolean;
  ispurchaseorder:boolean;
  isorderdetail:boolean;
  isupload:boolean;
  files:any;
  bool:boolean;
  isOrderClicked:boolean;

  constructor(private node:NodeapiService,private route:Router,private auth:AuthService) { 
    this.isorderdetail=false;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =true
    this.name =[]
    this.order = []
    this.files = []
    this.bool = true
    this.isOrderClicked = false;
  }

  ngOnInit() {
    feather.replace();
    this.node.getOrder().subscribe((result)=>{
      if(result['error_code']===401){
        alert("please login");
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
    alert("Order list is empty.");


  }else{
    alert("Please try again");
  }




      }
     
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
    
  }

  paymentDetailTab(){
    this.isorderdetail=false;
    this.ispaymentdetails=true
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =false
    
  }

  shippingDetailUploadTab(){
    this.isorderdetail=false;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = true
    this.isorderlist =false
  }



  orderDetail(doc){
    this.isorderdetail=true;
    this.ispaymentdetails=false
    this.ispurchaseorder=false
    this.isupload = false
    this.isorderlist =false
    this.order = doc;
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
    this.node.changeOrderStatus(this.order._id,"Accepted").subscribe((result)=>{
      alert("Order Accepted")
      element.disabled = true;
      this.bool = false;
    },(err)=>{
      alert("Please try again.")
    })
  }

  rejectOrder(element){
    this.node.changeOrderStatus(this.order._id,"Reject").subscribe((result)=>{
      alert("Order Rejected")
      element.disabled = true;
      this.bool =false;
    },(err)=>{
      alert("Please try again")
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
    this.node.uploadShippingDoc(formData).subscribe((res)=>{
      console.log(res);
      alert(res['message'])
    })
  }else{
    alert("Please select the shipment document.before uploading.")
  }
}

}
