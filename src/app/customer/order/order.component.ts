import { Component, OnInit } from '@angular/core';
declare var feather:any;
import { NodeapiService } from '../../nodeapi.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  loading = false;
  order:any;
  doc_arr:any;
  street:String;
  city:String;
  state:String;
  country:String;
  zip:number;
  orderDetail:any;
  isfirst:boolean;
  issecond:boolean;
  isthird:boolean;
  status:string;
  live_status:number;
  constructor(private node:NodeapiService) {
    this.getOrderList();
    this.stepFirst();
    this.orderDetail = {};
    this.status='pending';

  }

  ngOnInit() {
  feather.replace();
  this.order = [];
  }


  getOrderList(){

    this.loading = true;
    this.node.getAllOrder().subscribe((result)=>{
      this.order = result.data;
      console.log(this.order);
      this.loading = false;
    })

  }

  stepFirst(){
    this.isfirst=true;
    this.issecond=false;
    this.isthird = false;


  }

  stepSecond(){
    this.isfirst=false;
    this.issecond=true;
    this.isthird = false;

  }

  stepThird(){
    this.isfirst=false;
    this.issecond=false;
    this.isthird = true;

  }




  getOrderDetail(doc){

    this.stepSecond();
    console.log('order',doc)
    this.loading = true;
    this.node.getOrderByCustomer(doc._id).subscribe((res)=>{
      if(res['error_code']===200){
        this.getShippingDoc(doc['_id'])
        this.street = doc['shipping_Addr'][0]['street']
        this.city = doc['shipping_Addr'][0]['city']
        this.state = doc['shipping_Addr'][0]['state']
        this.country = doc['shipping_Addr'][0]['country']
        this.zip = doc['shipping_Addr'][0]['zip']

        this.status = res['data']['cancel_status']
        if(this.status==='Pending'){
          this.live_status=1
        }else  if(this.status==='Processing'){
          this.live_status=2
        }else  if(this.status==='Accepted'){
          console.log('status',this.live_status)
          this.live_status=3
        }else  if(this.status==='Shipped'){
          this.live_status=4
        }else  if(this.status==='Arrived'){
          this.live_status=5
        }else  if(this.status==='Delivered'){
          this.live_status=6
        }
        console.log("order",this.status)
        this.orderDetail = res['data'];


      }
      else{
        Swal({
          text: 'Please try again later.',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
      }

      this.loading = false;

    })


  }


  getShippingDoc(id){
    this.loading = true;
    this.node.getShippingDoc(id).subscribe((res)=>{
      this.doc_arr = res['data'];
      console.log(res)
      this.loading = false;

    })
  }

}
