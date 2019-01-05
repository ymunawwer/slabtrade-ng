import { Component, OnInit } from '@angular/core';
import {NgbModule,NgbCarousel,NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { NodeapiService } from '../../nodeapi.service';
import { PlatformLocation } from '@angular/common';
import { ViewChild,ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ENV } from 'src/app/core/env.config';
declare var feather:any;
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  quantity = 0;
  url = ENV.server;
  viewItemClickCount = 0;
  allItems = [];
  isitemclicked = false
  doc:any;
  port_list:any;
  items:any;
  shipping_cost:number;
  tax:number;
  isviewmore = false;
  number = 0;
  searchcolor;
  trustedUrl;
  isnull;
  item_image = [];
  searchtype;
  similarproduct:any;
  image:any;
  slider_image:any;
  issearched = false
  constructor(private nodeapi:NodeapiService,private sanitizer: DomSanitizer,private location: PlatformLocation,private _sanitizer: DomSanitizer,private auth:AuthService,private route:Router) {
    this.trustedUrl = this._sanitizer.bypassSecurityTrustUrl("http://localhost:4200/");
    this.items = []

    this.number = JSON.parse(localStorage.getItem('cart'))%6;
    this.similarproduct = []
    this.item_image =[]
    this.image =[]
    this.isnull = false;
    this.slider_image =[]
    this.slider_image = []
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
    if(this.auth.isAuthenticated() && this.auth.getUser().roles[0]==='customer'){
    this.nodeapi.fetchHomePageWithPrice().subscribe(async (data)=>{
<<<<<<< HEAD

      this.items = data.data;
      this.allItems = data.data;
=======
      console.log(data)
      this.items = data.data
>>>>>>> ca54c0cd23a981aa484836905227cc0719b1ee3d
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





    }

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
      this.nodeapi.getSimilarProduct(doc.supplier_id).subscribe((data)=>{

        this.similarproduct = data['data'];

        const element = document.querySelector("#top");
          if (element) { element.scrollIntoView(); }


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
            this.items = []
            this.isnull = true;
            const element = document.querySelector("#top");
          }
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
      }
      )

    }
      // rest of your code
    }



  }

  async toCart(doc,number){
    console.log('dimension',doc['dimension'][0]['width'],number);
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
    await this.nodeapi.getPortDetailBycountry(customer).subscribe((result)=>{
      console.log(result);
      this.port_list = result['data']
        this.tax = result['data'][0]['tax_percentage'];
        this.shipping_cost = result['data'][0]['shipping_cost'];
        // console.log('port',result['data'],tax,shipping_cost)
        console.log('port',this.tax,this.shipping_cost)
    // console.log('doc',doc)
<<<<<<< HEAD
    const discounted_price = this.getDiscountedPrice(doc['price'], doc['offer_value']) ?
    this.getDiscountedPrice(doc['price'], doc['offer_value']) : doc['price'];
    price = discounted_price*<number>this.number;
=======
    price = doc['price']*<number>this.quantity;
>>>>>>> ca54c0cd23a981aa484836905227cc0719b1ee3d




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
            localStorage.setItem('cart',JSON.stringify(this.number))
            alert("cart is updated");

            this.route.navigate(['/customer/cart'])


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
                    alert("please add item From similar Supplier or remove the last added item from your cart.")
                  }else{
                    console.log("updated cart",res)
                    localStorage.removeItem('cart')
                    localStorage.setItem('cart',total_quantity)


                    console.log(total_quantity)
                    this.route.navigate(['/customer/cart'])

                  }
                }

              })


          }

        }
      })
    }
    else if(number<1){
      alert("Slabs count can not be zero")
    }


  },(err)=>{
      console.log(err);
      alert("Fail to get port detail")

    })} else {
      alert('please Login to Continue');
      this.route.navigate(['/login']);
    }} else if(this.number===0) {
      alert('Please add item to the cart');
    }

  }
  viewMore(type){
    this.isviewmore = true;
    this.isnull = false;
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

    })
  }

  search(){
    this.issearched = true;
    this.isviewmore =false
    if(this.auth.isAuthenticated()){

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
        }
        )

      })
    }else{

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
      }
      )

    }
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



}
