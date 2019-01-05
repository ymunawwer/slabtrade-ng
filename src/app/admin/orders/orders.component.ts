import { Component, OnInit,Inject } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import {NodeapiService} from '../../nodeapi.service'
import { Router } from '@angular/router';
import * as html2canvas from 'html2canvas';
import { DataService } from '../../services/data.service';
import * as jsPDF from 'jspdf';
declare var feather:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],

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
  checking_payment_status: any;
  orders:any;
  iscreatepurchaseorder:boolean;
  order_status:any;
  checking_order_status: any;
  selectedOrder: any;
  purchase_order = {
    "invoice_date":0,
    "name":"",
    "street":"",
    "city":"",
    "state":"",
    "zip":"",
    "bill_no":0,
    "due_date":0,
    "account":"",
    "description":"",
    "location":"",
    "quantity":0,
    "price":0,
    "extended":0,
    "tax":0,


  }
  random = 0;

  constructor( private adminApi: AdminApiService,private node:NodeapiService,private router:Router, private dataservice: DataService) {
    this.orders =[]
    this.getOrder();
    this.file = []
    this.bundle_arr = [];
    this.iscreatepurchaseorder = false;
    this.selectedOrder = {};
    this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
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

  purchaseOrder(){
    this.ishome=false;
    this.isorderstatus=false;
    this.ispaymentmode=false;
    this.issupplierdetail=false;
    this.isCustomer=false;
    this.iscreatepurchaseorder = true;
  }

  isSupplierDetail(){
    this.ishome=false;
    this.isorderstatus=false;
    this.ispaymentmode=false;
    this.issupplierdetail=true;
    this.isCustomer=false;
    this.purchase_order['invoice_date'] = Date.now();
    this.purchase_order['name'] = this.order['name']
    this.purchase_order['street'] = '';
    this.purchase_order['city'] = '';
    this.purchase_order['state'] = '';
    this.purchase_order['zip'] = "0";
    this.purchase_order['bill_no'] = 0;
    this.purchase_order['due_date']= 0;
    this.purchase_order['account'] = "sad23"
    this.purchase_order['description'] = "sad23"
    this.purchase_order['location'] = this.order['port'];
    this.purchase_order['quantity'] = this.order['products'][0]['quantity'];
    this.purchase_order['price'] = this.order['total']
    this.purchase_order['extended'] = this.order['total']
    this.purchase_order['tax'] = this.order['tax']

    // this.createPurchaseOrder();
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
    this.iscreatepurchaseorder = false;
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
    console.log("Order",order)
    this.isOrderStatus();
    this.order_status = order['cancel_status'];
    this.checking_order_status = order['cancel_status'];
    this.payment = order['payment'];
    this.paymentstatus = order['payment_status'];
    this.checking_payment_status = order['payment_status'];
    this.order = order;
    this.products = this.order['products'];







  }
  onStatusUpdate(){
    console.log(this.order._id)
    console.log(this.order.cancel_status)
    let self = this;
    this.adminApi.updateStatus(this.order._id,this.order_status).subscribe(function(result){
      console.log(result)
      if(result['error_code']===200 && result['Message']!=='invalid order id'){
        alert(result['Message']);
        self.checking_order_status = self.order_status;
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

    let self = this;

    this.adminApi.statusPaymentUpdate(this.order['_id'],this.paymentstatus,this.payment).subscribe((res)=>{
      // console.log("success")
      alert("Successfully Updated");

      self.checking_payment_status = self.paymentstatus;


    },(err)=>{
      alert('Upload Failed.Please try again.');
    })


  }


  uploadPuchaseOrder(file){
    const formData:any = new FormData();
    // formData.append('shipping_file', this.files);
    formData.append( "_id",this.order._id)
    // formData.append("supplier_id",this.auth.getUser()._id)
    // const file: Array<File> = this.files;
    console.log("shipping",this.order)
    // if(file.length>0){
    // for(let i =0; i < file.length; i++){
      let name = "purchase_order"+Date.now()+".pdf";
      formData.append("wired_file", file, name );
  // }

  console.log('form data variable :   '+ formData.toString());

  console.log('order',this.order)

    this.adminApi.uploadPurchaseOrder(formData).subscribe((res)=>{
      console.log(res);
      alert(res['message'])
    })
  // }else{
  //   alert("Please select the shipment document.before uploading.")
  // }
}

  createPurchaseOrder(){


    var source = window.document.getElementsByClassName("purchase-order")[0];
    const options = {background: "white", height: source.clientHeight, width: source.clientWidth};

    console.log("source",source)

    html2canvas(source, options).then((canvas) => {
      //Initialize JSPDF

      let doc = new jsPDF("l", "mm", "a4");
      //Converting canvas to Image
      var width = doc.internal.pageSize.getWidth();

      var height = doc.internal.pageSize.getHeight();

      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 0, 0,width,height);

      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      // console.log("length",pdfOutput.length)
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (let i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }

      //Name of pdf
      const fileName = "doc.pdf";
      let binary = doc.output('blob')
      // Make file
      this.uploadPuchaseOrder(binary)
      console.log("output",doc.output('blob'))

      // doc.save(fileName)

  });

  }



}
