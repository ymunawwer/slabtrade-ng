import { Component, OnInit,Inject } from '@angular/core';
import {NgbModule,NgbCarousel,NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { NodeapiService } from '../../nodeapi.service';
import { PlatformLocation } from '@angular/common';
import { ViewChild,ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ENV } from 'src/app/core/env.config';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import Swal from 'sweetalert2';
declare var feather:any;
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  loading = false;
  quantity = 0;
  url = ENV.server;
  viewItemClickCount = 0;
  allItems = [];
  isitemclicked = false
  doc:any;
  subnumber:number;
  port_list:any;
  items:any;
  shipping_cost:number;
  tax:number;
  isviewmore = false;
  number = 0;
  counter_map:any;
  subcartarray:any;
  searchcolor;
  rem:number;
  item_obj_array:any
  searchCountry;
  thirdSearchBox;
  trustedUrl;
  isnull;
  item_image = [];
  searchtype;
  similarproduct:any;
  image:any;
  slider_image:any;
  issearched = false
  constructor(private nodeapi:NodeapiService,private sanitizer: DomSanitizer,private location: PlatformLocation,private _sanitizer: DomSanitizer,private auth:AuthService,private route:Router,public dialog: MatDialog) {
    this.trustedUrl = this._sanitizer.bypassSecurityTrustUrl("http://localhost:4200/");
    this.items = []
    this.subnumber = 0;

    this.number = JSON.parse(localStorage.getItem('cart'))%6;
    this.similarproduct = []
    this.item_image =[]
    this.image =[]
    this.counter_map = new Map();
    this.isnull = false;
    this.rem = 6-(JSON.parse(localStorage.getItem('cart'))%6);
    this.slider_image =[]
    this.slider_image = []
    this.item_obj_array = []
    this.subnumber = 0;
    this.location.onPopState(() => {
      this.issearched = false
      this.isitemclicked = false


  });
  this.getHomePage();
   }

  ngOnInit() {

    console.log('item',this.items)
    feather.replace();

  }

  sanitizeUrl(url) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    url = url.replace('home/gamasome/slabtrade/public/','');

     return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getDiscountedPrice(price, discout_percent) {

    return price - (discout_percent / 100) * price !== NaN ? price - (discout_percent / 100) * price : false;

  }



  getBackground(image) {

    // image = image.replace('home/gamasome/slabtrade/public/','');
    if(image){
      return this._sanitizer.bypassSecurityTrustStyle(`url(${image.path})`);
    }else{
      return null;
    }

}

  async getHomePage(){
    this.loading = true;

    if(this.auth.isAuthenticated() && this.auth.getUser().roles[0]==='customer'){

      this.nodeapi.fetchHomePageWithPrice().subscribe(async (data)=>{

      this.items = data.data;
      this.allItems = data.data;
      console.log(data)
     var count =0;
     if(data['error_code']===200){
     await this.items.forEach(el=>{

        el.docs.forEach((res)=>{

          count=count+1;
       res.images.forEach((img)=>{
         this.image.push(img.path)


       })
           if(el.docs.length === count){
             let arr =[]
          for (let i = 0;i<3;i++){

            let rand = Math.floor(Math.random() * Math.floor((this.image.length - 1)));


              this.slider_image.push(this.image[rand])

            }
         }
      })
    })
  console.log('items', this.items);
  this.loading = false;
  }else if(data['error_code']===401){

    sessionStorage.removeItem('currentUser')
    this.nodeapi.fetchHomePage().subscribe((data)=>{

      this.items = data.data


      var count =0;
      this.items.forEach(el=>{

         el.docs.forEach((res)=>{

           count=count+1;
        res.images.forEach((img)=>{
          this.image.push(img.path)



        })

            if(el.docs.length === count){

              let arr =[]
           for (let i = 0;i<3;i++){

             let rand = Math.floor(Math.random() * Math.floor((this.image.length - 1)));


               this.slider_image.push(this.image[rand])

             }
          }
       })
     })



    })



    this.loading = false;

    }
    this.loading = false;
    },(err)=>{

      this.nodeapi.fetchHomePage().subscribe((data)=>{

        this.items = data.data



        var count =0;
        this.items.forEach(el=>{

           el.data.forEach((res)=>{

             count=count+1;
          res.images.forEach((img)=>{
            this.image.push(img.path)



          })

              if(el.docs.length === count){

                let arr =[]
             for (let i = 0;i<3;i++){

               let rand = Math.floor(Math.random() * Math.floor((this.image.length - 1)));


                 this.slider_image.push(this.image[rand])

               }
            }
         })
       })

       this.loading = false;

      })

    })
  }else{
    this.nodeapi.fetchHomePage().subscribe((data)=>{

      this.items = data.data


      var count =0;
      this.items.forEach(el=>{

         el.docs.forEach((res)=>{

           count=count+1;
        res.images.forEach((img)=>{
          this.image.push(img.path)



        })

            if(el.docs.length === count){

              let arr =[]
           for (let i = 0;i<3;i++){

             let rand = Math.floor(Math.random() * Math.floor((this.image.length - 1)));


               this.slider_image.push(this.image[rand])

             }
          }
       })
     })


     this.loading = false;


    })

  }
  }

  @ViewChild('top') myelement : ElementRef;

  viewItemDetail(doc){
    

    // console.log(doc)
    this.doc = doc;
    this.doc.images.forEach(element => {
      this.item_image.push(element.path)


    });
    this.isitemclicked = true
    this.issearched = false
    if(doc){
    this.loading = true;
      this.nodeapi.getSimilarProduct(doc.supplier_id).subscribe((data)=>{

        

        this.similarproduct = data['data'];

        const element = document.querySelector("#top");
          if (element) { element.scrollIntoView(); }

    this.loading = false;


      })
    }

    if(this.viewItemClickCount === 0) {
    setTimeout(function() {
      $('#exzoom').exzoom({});
    }, 100);
  }
  this.viewItemClickCount++;

console.log('images', this.item_image);
console.log('doc', this.doc);

  }


  searchByColor(event) {
    if(event.keyCode == 13) {
      this.issearched = true

      if(this.auth.isAuthenticated()){

        let colorCode = '';

        if(event.target.value.toLowerCase() === 'black') {
            colorCode = '000000';
        } else if(event.target.value.toLowerCase() === 'blue') {
            colorCode = '0000ff';
        } else if(event.target.value.toLowerCase() === 'grey') {
            colorCode = '808080';
        } else {
          colorCode = '';
        }

    this.loading = true;
      this.nodeapi.searchByColorWithPrice(colorCode, 0).subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log(data['data']);
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data['data']
            }]
          }

        this.items = local_data.data;


        }else{
          this.items = this.allItems;
          this.isnull = true;
          const element = document.querySelector("#top");
        }

    this.loading = false;

      },(err)=>{
        this.nodeapi.searchByColor(event.target.value,0).subscribe((data)=>{
          if(data !==null && typeof data['data'] !== 'undefined'){
            this.isnull = false;
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = local_data.data;

          }else{
            this.items = this.allItems;
            this.isnull = true;
            const element = document.querySelector("#top");
          }
      this.loading = false;

        }
        )

      })
    }else{
      this.nodeapi.searchByColor(event.target.value,0).subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data;

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }

    this.loading = false;


      }
      )

    }
      // rest of your code
    }
  }

  incCount() {
    let container_count = 1;
    let prev = JSON.parse(localStorage.getItem('cart'))%6;
    if(this.number <= 5 ) {
    this.number += 1;
                                                               // 6 - 4%6
    this.quantity =Math.abs(prev - this.number);
    // console.log("differnce",prev - this.number)                // item in cart - count 1 - 4 |-3|

    // console.log("Quantity",this.quantity)
    }
    // else if(this.number%6 ===0 ) {
    //   container_count +=1;
    //   this.number = 1;

      // this.remaining = 6;
      // console.log(this.quantity)


    // }
    if(this.number%6!==0){
      console.log((container_count-1)*6 + this.number)
    }else if(this.number%6===0){
      console.log((container_count-1)*6 + this.number)
    }

  }

  decCount() {
    let prev = JSON.parse(localStorage.getItem('cart'))%6;
    if(this.number >= 1 && this.number>JSON.parse(localStorage.getItem('cart'))%6) {
      this.number -= 1;
      this.quantity =Math.abs(prev - this.number);
      // console.log("differnce",prev - this.number)                // item in cart - count 1 - 4 |-3|

      // console.log("Quantity",this.quantity)
    }
  }

  searchByName(event) {

    if(event.keyCode == 13) {
      this.issearched = true

      if(this.auth.isAuthenticated()){

    this.loading = true;

      this.nodeapi.searchByTypeWithPrice(event.target.value,0).subscribe((data)=>{
        if(data !==null &&  typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log(data['data'])
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data;


        }else{
          // alert("no item to display");
          this. items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }

    this.loading = false;

      },(err)=>{
        this.nodeapi.searchByType(event.target.value,0).subscribe((data)=>{
          if(data !==null && typeof data['data'] !== 'undefined'){
            this.isnull = false;
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = local_data.data;

          }else{
            this.items = []
            this.isnull = true;
            const element = document.querySelector("#top");
          }
    this.loading = false;

        }
        )

      })
    }else{
      this.nodeapi.searchByType(event.target.value,0).subscribe((data)=>{
        if(typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log("data",data)
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,

              "docs":data.data
            }]
          }
        this.items = local_data.data;
        console.log('item',local_data)

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
    this.loading = false;

      }
      )

    }
      // rest of your code
    }



  }

  async toCart(doc,number){
  this.addItemCart();
    console.log('dimension',doc['dimension'][0]['width'],number);
    console.log(this.similarproduct)
    let net_area = 0;
    // this.tax=1.1
    // this.shipping_cost = 1;
    // var total_quantity;
    var cart_total;
   var tax_amount;
    var price;
    var customer;
    var cart_amount;
    if(this.number!==0){
    if(this.auth.isAuthenticated() ){
    customer = this.auth.getUser()['country'];
    console.log(customer)
    this.loading = true;
    await this.nodeapi.getPortDetailBycountry(customer).subscribe((result)=>{
      console.log(result);
      this.port_list = result['data']
        this.tax = result['data'][0]['tax_percentage'];
        this.shipping_cost = result['data'][0]['shipping_cost'];
        // console.log('port',result['data'],tax,shipping_cost)
        console.log('port',this.tax,this.shipping_cost)
    // console.log('doc',doc)
    const discounted_price = this.getDiscountedPrice(doc['price'], doc['offer_value']) ?
    this.getDiscountedPrice(doc['price'], doc['offer_value']) : doc['price'];
    price = discounted_price*<number>this.quantity;



    if(doc && number>0){
      this.nodeapi.getCart('0').subscribe((res)=>{

        if(res.error_code === 401) {

          this.route.navigate(['/login']);

        } else if(res.error_code === 200) {


          if(res.message==="Cart is Empty"){
            tax_amount = price/(1+(this.tax/100));
          let data = {"user_id":this.auth.getUser()._id,
          "bundle":[
            {
            "cancel_status":"Pending",
            "supplier_id":doc.supplier_id,
            "bundle_id":doc.bundle_number,
            "bundle_name":doc.product_name,
            "net_area":net_area,
            "thickness":doc.dimension[0].thickness,
            "quantity":this.number,
            "total":price,

            "Dimension":[{
              "width":doc['dimension'][0]['width'],
              "height":doc['dimension'][0]['height'],
              "unit":"inch"
            }]}],
            "total_amount":price,
            "total_quantity":this.number,
            "cart_total":price + this.shipping_cost + tax_amount,
            "shipping_cost":this.shipping_cost,
            "tax":tax_amount}




console.log('data', data);

          this.nodeapi.addToCart(data).subscribe((response)=>{
            // localStorage.removeItem('cart')
            localStorage.setItem('cart',JSON.stringify(this.number));
            Swal({
              text: 'Cart updated successfully',
              type: 'success',
              confirmButtonText: 'ok',
              confirmButtonColor: '#0a3163'
            });
            // this.route.navigate(['/customer/cart'])


          })

          }else if(res.message!=="Cart is Empty"){
            console.log("quantity",this.quantity);
            console.log("document",doc)
            cart_amount = res.data[0].total_amount+price;
            tax_amount = cart_amount/(1+(this.tax/100));
            let total_quantity = res.data[0].total_quantity+this.quantity;
            let bundle={
              "supplier_id":doc.supplier_id,
              "bundle_id":doc.bundle_number,
              "bundle_name":doc.product_name,
              "net_area":net_area,
              "thickness":doc.dimension[0].thickness,
              "quantity":this.quantity,
              "total":price,
              "Dimension":[{
                "width":doc['dimension'][0]['width'],
                "height":doc['dimension'][0]['height'],
                "unit":"inch"
              }]}

              res.data[0].bundle.push(bundle)
            let data_updated = {"user_id":this.auth.getUser()._id,
            "bundle":res.data[0].bundle,

            "total_quantity":total_quantity,

            "total_amount":price,

            "cart_total":cart_amount+this.shipping_cost+tax_amount,

            "shipping_cost":this.shipping_cost,

            "tax":tax_amount
          }

// "error_code":200,"Message":"Please add more item to the container.","data":{"bundle_id":"987986","bundle_name":"Marble","supplier_id":"5c075eec28d89c7915c53ea9"
              // res.data[0].bundle.push(data_updated)

              this.nodeapi.addToCart(data_updated).subscribe((res)=>{
                if(res["error_code"] ===200){
                  if(res['Message'] === "Please add more item to the container."){
                    Swal({
                      text: 'please add item From similar Supplier or remove the last added item from your cart.',
                      type: 'warning',
                      confirmButtonText: 'ok',
                      confirmButtonColor: '#0a3163'
                    });

                  }else{
                    console.log("updated cart",res)
                    localStorage.removeItem('cart')
                    localStorage.setItem('cart',total_quantity)

                    Swal({
                      text: 'Cart updated successfully',
                      type: 'success',
                      confirmButtonText: 'ok',
                      confirmButtonColor: '#0a3163'
                    });

                    console.log(total_quantity)
                    // this.route.navigate(['/customer/cart'])

                  }
                }

              })


          }

        }
      })
    }
    else if(number<1){
      Swal({
        text: 'Slab count cannot be Zero',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    }

    this.loading = false;


  },(err)=>{
    this.loading = false;

      console.log(err);
      Swal({
        text: 'Fail to get port detail',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })} else {
      Swal({
        text: 'Please login to continue',
        type: 'info',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      this.route.navigate(['/login']);
    }} else if(this.number===0) {
      Swal({
        text: 'Please add item to the cart',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    }

  }
  viewMore(type){
    this.isviewmore = true;
    this.isnull = false;
    this.loading = true;

    this.nodeapi.searchByType(type,0).subscribe((res)=>{
      console.log(res)
      let data = []
      let id=res.data[0]['product_type']
      console.log("id",id)
      if(res.data!==null){
        let data = {

          "data":[{
            "_id":id,
            "docs":res.data
          }]
        }
        this.items = data['data']
        console.log('items', this.items);
      }
      this.loading = false;

    })
  }

  search(){
    this.issearched = true;
    this.isviewmore =false
    if(this.auth.isAuthenticated()){

    this.loading = true;

      this.nodeapi.searchByColorWithPrice(this.searchcolor,0).subscribe((data)=>{
        if(data!==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log(data['data']);
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data['data']
            }]
          }
        this.items = local_data.data;


        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }

    this.loading = false;

      },(err)=>{
        this.nodeapi.searchByColor(this.searchcolor,0).subscribe((data)=>{
          if(data !==null && typeof data['data'] !== 'undefined'){
            this.isnull = false;
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = local_data.data;

          }else{
            this.items = []
            this.isnull = true;
            const element = document.querySelector("#top");
          }
    this.loading = false;

        }
        )

      })
    }else{

      this.loading = true;
      this.nodeapi.searchByColor(this.searchcolor,0).subscribe((data)=>{
        console.log('data',data )
        if(data!==null && typeof data['data'] !== 'undefined' ){
          this.isnull = false;
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data;

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
    this.loading = false;

      }
      )

    }
  }

  searchByCountry() {



  }

  searchThirdBox() {

  }


  searchType(){
    console.log(this.searchtype)
    this.issearched = true;
    this.isviewmore =false
    if(this.auth.isAuthenticated()){

      this.nodeapi.searchByTypeWithPrice(this.searchtype,0).subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log(data['data'])
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data;


        }else{
          // alert("no item to display");
          this. items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      },(err)=>{
        this.nodeapi.searchByType(this.searchtype,0).subscribe((data)=>{
          if(data !==null && typeof data['data'] !== 'undefined'){
            this.isnull = false;
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = local_data.data;

          }else{
            this.items = []
            this.isnull = true;
            const element = document.querySelector("#top");
          }
        }
        )

      })
    }else{
      this.nodeapi.searchByType(this.searchtype,0).subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log("data",data)
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,

              "docs":data.data
            }]
          }
        this.items = local_data.data;
        console.log('item',local_data)

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      }
      )

    }
  }


  showAllItem(){
    this.getHomePage();
    this.isviewmore = false;
    this.issearched = false;
  }

  mostRecentlyAdded(){

    console.log(this.searchtype)
    this.issearched = true;
    this.isviewmore =false
    if(this.auth.isAuthenticated()){

      this.nodeapi.recentlyAddedWithPrice().subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log(data['data'])
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = data.data;


        }else{
          // alert("no item to display");
          this. items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      },(err)=>{
        this.nodeapi.recentlyAddedWithoutPrice().subscribe((data)=>{
          if(data !==null && typeof data['data'] !== 'undefined'){
            this.isnull = false;
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = data.data;

          }else{
            this.items = []
            this.isnull = true;
            const element = document.querySelector("#top");
          }
        }
        )

      })
    }else{
      this.nodeapi.recentlyAddedWithoutPrice().subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          console.log("data",data)
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,

              "docs":data.data
            }]
          }
        this.items = data.data;
        console.log('item',local_data)

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      }
      )

    }




  }

mostlyViewed(){

  console.log(this.searchtype)
  this.issearched = true;
  this.isviewmore =false
  if(this.auth.isAuthenticated()){

    this.nodeapi.mostViewedWithPrice().subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log(data['data'])
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,
            "docs":data.data
          }]
        }
      this.items = data.data;


      }else{
        // alert("no item to display");
        this. items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    },(err)=>{
      this.nodeapi.mostViewedWithoutPrice().subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = data.data;

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      }
      )

    })
  }else{
    this.nodeapi.mostViewedWithoutPrice().subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log("data",data)
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,

            "docs":data.data
          }]
        }
      this.items = data.data;
      console.log('item',local_data)

      }else{
        this.items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    }
    )

  }




}


incSubCount(num){
  console.log(this.counter_map[num])
  if(this.counter_map[num]<6 && this.rem!==0){
    this.number+=1;
    this.rem -= 1;
    this.counter_map[num] +=  1
  }
  

}

decSubCount(num){
  if(this.counter_map[num]>0){
    if(this.number>JSON.parse(localStorage.getItem('cart'))%6){
      this.number -=1
    }
    this.counter_map[num] -=  1
    this.rem += 1;
  }

  

}

productWithDeals(){
  console.log(this.searchtype)
  this.issearched = true;
  this.isviewmore =false
  if(this.auth.isAuthenticated()){

    this.nodeapi.searchByDealsWithPrice().subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log(data['data'])
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,
            "docs":data.data
          }]
        }
      this.items = data.data;


      }else{
        // alert("no item to display");
        this. items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    },(err)=>{
      this.nodeapi.searchByDealsWithoutPrice().subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = data.data;

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      }
      )

    })
  }else{
    this.nodeapi.searchByDealsWithoutPrice().subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log("data",data)
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,

            "docs":data.data
          }]
        }
      this.items = data.data;
      console.log('item',local_data)

      }else{
        this.items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    }
    )

  }


}

searchByCity(ev){
  if(ev.keyCode == 13) {
  console.log(this.searchtype)
  this.issearched = true;
  this.isviewmore =false
  console.log(ev.target.value)
  if(this.auth.isAuthenticated()){

    this.nodeapi.searchByCityWithPrice(ev.target.value).subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log(data['data'])
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,
            "docs":data.data
          }]
        }
      this.items = data.data;


      }else{
        // alert("no item to display");
        this. items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    },(err)=>{
      this.nodeapi.searchByCityWithoutPrice(ev.target.value).subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = data.data;

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      }
      )

    })
  }else{
    this.nodeapi.searchByCityWithoutPrice(ev.target.value).subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log("data",data)
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,

            "docs":data.data
          }]
        }
      this.items = data.data;
      console.log('item',local_data)

      }else{
        this.items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    }
    )

  }

}}

addItem(prod){
  this.item_obj_array = []
  console.log(prod);
  // this.similarproduct.forEach(item=>{
  //   let obj = {'key':item['bundle_number'],'count':0}
  //   this.counter_map.push(obj);
  // })

  

  // let data = {"user_id":this.auth.getUser()._id,
  // "bundle":[
  //   {
  //   "cancel_status":"Pending",
  //   "supplier_id":doc.supplier_id,
  //   "bundle_id":doc.bundle_number,
  //   "bundle_name":doc.product_name,
  //   "net_area":net_area,
  //   "thickness":doc.dimension[0].thickness,
  //   "quantity":this.number,
  //   "total":price,

  //   "Dimension":[{
  //     "width":doc['dimension'][0]['width'],
  //     "height":doc['dimension'][0]['height'],
  //     "unit":"inch"
  //   }]}],
  //   "total_amount":price,
  //   "total_quantity":this.number,
  //   "cart_total":price + this.shipping_cost + tax_amount,
  //   "shipping_cost":this.shipping_cost,
  //   "tax":tax_amount}

for(let key in this.counter_map){
  if(this.counter_map[key]>0){
  var product = this.similarproduct.filter(el=>el['bundle_number']===key)
  product = product[0]
  console.log(product)
  let data =     {
    "cancel_status":"Pending",
    "supplier_id":product['supplier_id'],
    "bundle_id":product['bundle_number'],
    "bundle_name":product['product_name'],
    "net_area":product['net_area'],
    "thickness":product.dimension[0].thickness,
    "quantity":this.counter_map[key],
    "total":this.counter_map[key]*product['price'],

    "Dimension":[{
      "width":product['dimension'][0]['width'],
      "height":product['dimension'][0]['height'],
      "unit":"inch"
    }]
  }
   
  
  this.item_obj_array.push(data)
}
}
let cart = {
   "user_id":this.auth.getUser()._id,
   "bundle":this.item_obj_array,

    "total_amount":10,
    "total_quantity":4,
    "cart_total":10 + 10 + 10,
    "shipping_cost":10,
    "tax":10
  }

  console.log(cart)

  this.nodeapi.addToCart(cart).subscribe((response)=>{
    // localStorage.removeItem('cart')
    localStorage.setItem('cart',JSON.stringify(this.number));
    Swal({
      text: 'Cart updated successfully',
      type: 'success',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
    this.route.navigate(['/customer/cart'])


  })
  
}

  // this.item_obj_array.push(obj)

 // console.log(this.counter_map)

  // this.subcartarray.push()
  



addItemCart(){
  console.log();
  this.similarproduct.forEach(item=>{
    this.counter_map[item['bundle_number']] = 0
  })


  
  console.log(this.counter_map)

  // this.subcartarray.push()
  
}

searchByCityradio(){
  
  console.log(this.searchtype)
  this.issearched = true;
  this.isviewmore =false
  if(this.auth.isAuthenticated()){

    this.nodeapi.searchByCityWithPrice(this.searchCountry).subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log(data['data'])
        let id = data.data[0]['product_type']
        let local_data = {

          "data":[{
            "_id":id,
            "docs":data.data
          }]
        }
      this.items = data.data;


      }else{
        // alert("no item to display");
        this. items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    },(err)=>{
      this.nodeapi.searchByCityWithoutPrice(this.searchCountry).subscribe((data)=>{
        if(data !==null && typeof data['data'] !== 'undefined'){
          this.isnull = false;
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = data.data;

        }else{
          this.items = []
          this.isnull = true;
          const element = document.querySelector("#top");
        }
      }
      )

    })
  }else{
    this.nodeapi.searchByCityWithoutPrice(this.searchCountry).subscribe((data)=>{
      if(data !==null && typeof data['data'] !== 'undefined'){
        this.isnull = false;
        console.log("data",data)
        let id = data.data[0]['product_type']
        let local_data = {

        //   "data":[{
        //     "_id":id,

        //     "docs":data.data
        //   }]
        }
      this.items = data.data;
      console.log('item',local_data)

      }else{
        this.items = []
        this.isnull = true;
        const element = document.querySelector("#top");
      }
    }
    )

  }

}

}

export interface DialogData {
  animal: string;
  name: string;
}







