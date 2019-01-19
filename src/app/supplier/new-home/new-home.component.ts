import { NodeapiService } from './../../nodeapi.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
declare var feather: any;
@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.sass']
})
export class NewHomeComponent implements OnInit {
orders_arr:any;
products_arr:any;
total_slabs:number;
total_bundles:number;
total_orders:number;


loading;
  constructor(private node:NodeapiService) {
    this.loading=true
    this.node.getSupplierDashboardData().subscribe((el)=>{
      this.loading = false
      console.log(el)
      this.orders_arr =el['data']['orders']
      this.products_arr =el['data']['products']
      this.total_bundles = el['data']['total_bundles'] 
      this.total_orders = el['data']['total_orders']
      this.total_slabs = el['data']['total_slabs']
    },err=>{
      this.loading = false
    })
   }

  ngOnInit() {
    feather.replace();

  }



  removeProduct(bundle_number){
    this.node.removeProduct(bundle_number).subscribe(el=>{

      alert(bundle_number+"remove Succesfully")

      window.location.reload();

    },err=>{
      alert(err)
    })
  }

}
