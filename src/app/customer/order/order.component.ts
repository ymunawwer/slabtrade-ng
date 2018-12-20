import { Component, OnInit } from '@angular/core';
declare var feather:any;
import { NodeapiService } from '../../nodeapi.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  order:any;
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
    
    this.node.getAllOrder().subscribe((result)=>{
      this.order = result.data;
      console.log(this.order);
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
    console.log(doc)
    this.node.getOrderByCustomer(doc[0]._id).subscribe((res)=>{
      if(res['error_code']===200){

        console.log(res)
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
        alert("Please try again later.")
      }
    

    })


  }

}
