import { Component, OnInit } from '@angular/core';
// import { NgForm} from '@angular/forms'
import {NodeapiService} from '../../nodeapi.service'
import { AdminApiService } from '../../admin-api.service';
import { Router } from '@angular/router'
declare var feather:any;
@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.sass']
})
export class ShippingDetailsComponent implements OnInit {
  country:String;
  port_arr:any;
  port_name:String;
  cost:Number;
  facility_cost:Number;
  shipping_cost:Number;
  tax_percentage:Number;
  new_port_cost:Number;
  new_port_name:String;
  update_port_name:String;
  update_port_price:Number;
  step1:boolean;
  step2:boolean;
  step3:boolean;
  
  step4:boolean;
  selectedport:any;

  
  constructor(private nodeapi:NodeapiService,private adminapi:AdminApiService,private router:Router) {
    this.country = 'india'
    this.port_arr = [];
    this.port_name = '';
    this.cost = 0;
    this.shipping_cost = 0;
    this.tax_percentage = 0;
    this.new_port_cost = 0;
    this.new_port_name = '';
    this.facility_cost = 0;
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
   }

  ngOnInit() {
    this.getPort();
    console.log(this.selectedport)
    feather.replace();
    
  }
  getPort(){
    console.log(this.country)
    this.shipping_cost = 0
      this.tax_percentage = 0
    this.adminapi.getPortByCountry(this.country).subscribe((res)=>{
      
      this.port_arr = res['data'];
      console.log(res)
      this.shipping_cost = res['data'][0]['shipping_cost'];
      this.tax_percentage = res['data'][0]['tax_percentage'];
      this.facility_cost = res['data'][0]['facility_cost'];
      // this.shipping_cost = res['data']['shipping_cost'];
      res['data'].forEach(element => {
        console.log(element['port_name'])

        
      });
      console.log(this.new_port_cost)
      console.log(this.new_port_name)
      console.log(this.tax_percentage)
    
    })
  
  }
  addPort(){
    let data = {
      'port_name':this.new_port_name,
      'country':this.country,
      'shipping_cost':this.shipping_cost,
      'port_cost':this.new_port_cost,
      'tax_percentage':this.tax_percentage,
      'facilities_cost':this.facility_cost
    }
    this.adminapi.addPort(data).subscribe((res)=>{
      alert("Port added succesfuly");
      this.router.navigate(['/admin'])
    },(err)=>{
      alert("Something went Wrong Please try again.")
    })
  }
  onStep1(){
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;

  }
  onStep2(){
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;

  }

  onStep3(){
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
    this.step4 = false;

  }

  onStep4(){
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = true;

  }

  removePort(id){
    // console.log(this.selectedport)
    let port = this.port_arr.filter((name)=>{
      return name['port_name'] === this.selectedport
    })
    
    this.adminapi.removePort(port[0]['port_id']).subscribe((res)=>{
      alert("Port removed Succesfully");
      window.location.reload();

    },(err)=>{
      alert("please try again");
      window.location.reload();
    })
  }
  onUpdate(){
    
   
    let port = this.port_arr.filter((name)=>{
      return name['port_name'] === this.selectedport
    })
  
    let data = {
      "port_id":port['port_id'],
      'port_name':this.update_port_name,
      'country':this.country,
      'shipping_cost':this.shipping_cost,
      'port_cost':this.update_port_price,
      'tax_percentage':this.tax_percentage,
      'facilities_cost':this.facility_cost
    }

    this.adminapi.updatePort(data).subscribe((res)=>{
      alert("Port Updated Succesfully");
      window.location.reload();

    },(err)=>{
      alert("please try again");
      window.location.reload();
    })
    
  }

}
