import { Component, OnInit } from '@angular/core';
import {NgbModule,NgbCarousel,NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { NodeapiService } from '../../nodeapi.service';
import { PlatformLocation } from '@angular/common';
import { ViewChild,ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var feather:any;
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.sass'],
  providers:[NgbCarousel,NgbCollapse]
})
export class CustomerDashboardComponent implements OnInit {

  isitemclicked = false
  doc:any;
  items:any;
  number:Number = 0;
  trustedUrl;
  similarproduct:any;
  issearched = false
  constructor(private nodeapi:NodeapiService,private location: PlatformLocation,private _sanitizer: DomSanitizer,private auth:AuthService,private route:Router) {
    this.trustedUrl = this._sanitizer.bypassSecurityTrustUrl("http://localhost:4200/");
    this.items = []
    this.similarproduct = []
    this.location.onPopState(() => {
      this.issearched = false
      this.isitemclicked = false

  });
   }

  ngOnInit() {
    this.getHomePage();
    feather.replace();

  }


  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
}

  getHomePage(){
    if(this.auth.isAuthenticated()){
    this.nodeapi.fetchHomePageWithPrice().subscribe((data)=>{
      this.items = data.data
      console.log(this.items)
    },(err)=>{
      this.nodeapi.fetchHomePage().subscribe((data)=>{
        this.items = data.data
        console.log(this.items)
      })

    })
  }else{
    this.nodeapi.fetchHomePage().subscribe((data)=>{
      this.items = data.data
      console.log(this.items)
    })

  }
  }

  @ViewChild('top') myelement : ElementRef;

  viewItemDetail(doc){
    // console.log(doc)
    this.doc = doc;
    this.isitemclicked = true
    this.issearched = false
    if(doc){
      this.nodeapi.getSimilarProduct(doc.supplier_id).subscribe((data)=>{
        this.similarproduct = data;

        const element = document.querySelector("#top");
          if (element) { element.scrollIntoView(); }


      })
    }




  }


  searchByColor(event) {
    if(event.keyCode == 13) {
      this.issearched = true
      if(this.auth.isAuthenticated()){

      this.nodeapi.searchByColorWithPrice(event.target.value,0).subscribe((data)=>{
        if(data!==null){
        this.items = data.data;
        console.log(data)
        }else{
          const element = document.querySelector("#top");
        }
      },(err)=>{
        this.nodeapi.searchByColor(event.target.value,0).subscribe((data)=>{
          if(data!==null){
          this.items = data.data;
          console.log(data)
          }else{
            const element = document.querySelector("#top");
          }
        }
        )

      })
    }else{
      this.nodeapi.searchByColor(event.target.value,0).subscribe((data)=>{
        if(data!==null){
        this.items = data.data;
        console.log(data)
        }else{
          const element = document.querySelector("#top");
        }
      }
      )

    }
      // rest of your code
    }
  }

  searchByName(event) {

    if(event.keyCode == 13) {
      this.issearched = true
      if(this.auth.isAuthenticated()){

      this.nodeapi.searchByTypeWithPrice(event.target.value,0).subscribe((data)=>{
        if(data!==null){
        this.items = data.data;
        console.log(data)
        }else{
          const element = document.querySelector("#top");
        }
      },(err)=>{
        this.nodeapi.searchByType(event.target.value,0).subscribe((data)=>{
          if(data!==null){
          this.items = data.data;
          console.log(data)
          }else{
            const element = document.querySelector("#top");
          }
        }
        )

      })
    }else{
      this.nodeapi.searchByType(event.target.value,0).subscribe((data)=>{
        if(data!==null){
        this.items = data.data;
        console.log(data)
        }else{
          const element = document.querySelector("#top");
        }
      }
      )

    }
      // rest of your code
    }



  }

  toCart(doc,number){
    // console.log(doc,number);
    let net_area = 0;



    if(doc && number>0){

      this.nodeapi.getCart('0').subscribe((res)=>{

        if(res.error_code === 401){
          Swal({
            text: 'please login',
            type: 'error',
            confirmButtonText: 'ok',
            confirmButtonColor: '#0a3163'
          });
          this.route.navigate(['/login'])

        }else if(res.error_code === 200){
          console.log("document",doc)

          if(res.message==="Cart is Empty"){
          let data = {"user_id":this.auth.getUser()._id,
          "bundle":[
            {
            "bundle_id":doc.bundle_number,
            "bundle_name":doc.product_name,
            "net_area":net_area,
            "thickness":doc.thickness,
            "quantity":number,

            "Dimension":[{
              "width":100,
              "height":200,
              "unit":"inch"
            }]}]}




          this.nodeapi.addToCart(data).subscribe((response)=>{
            Swal({
              text: 'cart is updated',
              type: 'success',
              confirmButtonText: 'ok',
              confirmButtonColor: '#0a3163'
            });

            this.route.navigate(['/customer/cart'])


          })

          }else{

            let data = {"user_id":this.auth.getUser()._id,"bundle":doc}

            this.nodeapi.getCart("0").subscribe((result)=>{
              alert("something")
              result.data[0].bundle.push(doc)
              this.nodeapi.addToCart(result).subscribe((res)=>{
                Swal({
                  text: 'cart is updated',
                  type: 'success',
                  confirmButtonText: 'ok',
                  confirmButtonColor: '#0a3163'
                });

              })

            })
          }

        }
      })
    }
    else if(number<1){
      Swal({
        text: 'Slabs count can not be zero',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    }
  }



}
