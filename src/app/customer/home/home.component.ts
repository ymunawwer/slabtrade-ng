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

  url = ENV.server;
  isitemclicked = false
  doc:any;
  items:any;
  shipping_cost:number;
  tax:number;

  number = 0;
  trustedUrl;
  item_image:any;
  similarproduct:any;
  image:any;
  slider_image:any;
  issearched = false
  constructor(private nodeapi:NodeapiService,private sanitizer: DomSanitizer,private location: PlatformLocation,private _sanitizer: DomSanitizer,private auth:AuthService,private route:Router) {
    this.trustedUrl = this._sanitizer.bypassSecurityTrustUrl("http://localhost:4200/");
    this.items = []
    this.similarproduct = []
    this.item_image =[]
    this.image =[]
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


  getBackground(image) {
    image = image.replace('home/gamasome/slabtrade/public/','');
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
}

  async getHomePage(){
    if(this.auth.isAuthenticated() && this.auth.getUser().roles[0]==='customer'){
    this.nodeapi.fetchHomePageWithPrice().subscribe(async (data)=>{

      this.items = data.data
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
    })}else if(data['error_code']===401){

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




  }


  searchByColor(event) {
    if(event.keyCode == 13) {
      this.issearched = true
      if(this.auth.isAuthenticated()){

      this.nodeapi.searchByColorWithPrice(event.target.value,0).subscribe((data)=>{
        if(data!==null){

          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data[0];


        }else{
          const element = document.querySelector("#top");
        }
      },(err)=>{
        this.nodeapi.searchByColor(event.target.value,0).subscribe((data)=>{
          if(data!==null){
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = local_data.data;

          }else{
            const element = document.querySelector("#top");
          }
        }
        )

      })
    }else{
      this.nodeapi.searchByColor(event.target.value,0).subscribe((data)=>{
        if(data!==null){
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data;

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
          let id = data.data[0]['product_type']
          let local_data = {

            "data":[{
              "_id":id,
              "docs":data.data
            }]
          }
        this.items = local_data.data;


        }else{
          const element = document.querySelector("#top");
        }
      },(err)=>{
        this.nodeapi.searchByType(event.target.value,0).subscribe((data)=>{
          if(data!==null){
            let id = data.data[0]['product_type']
            let local_data = {

              "data":[{
                "_id":id,
                "docs":data.data
              }]
            }
          this.items = local_data.data;

          }else{
            const element = document.querySelector("#top");
          }
        }
        )

      })
    }else{
      this.nodeapi.searchByType(event.target.value,0).subscribe((data)=>{
        if(data!==null){
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
          const element = document.querySelector("#top");
        }
      }
      )

    }
      // rest of your code
    }



  }

  async toCart(doc,number){
    // console.log(doc,number);
    let net_area = 0;
    // this.tax=1.1
    // this.shipping_cost = 1;
    // var total_quantity;
    var cart_total;
   var tax_amount;
    var price;
    var customer;
    customer = this.auth.getUser()['country'];
    await this.nodeapi.getPortDetailBycountry(customer).subscribe((result)=>{
        this.tax = result['data']['tax_percentage'];
        this.shipping_cost = result['data']['shipping_cost'];
        // console.log('port',result['data'],tax,shipping_cost)

    },(err)=>{
      alert("Fail to get port detail")

    })
    console.log('port',this.tax,this.shipping_cost)
    // console.log('doc',doc)
    price = doc['price']*<number>this.number;




    if(doc && number>0){
      this.nodeapi.getCart('0').subscribe((res)=>{

        if(res.error_code === 401){
          alert("please login")
          this.route.navigate(['/login'])

        }else if(res.error_code === 200){


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
              "width":100,
              "height":200,
              "unit":"inch"
            }]}],
            "total_amount":price,
            "total_quantity":this.number,
            "cart_total":price + this.shipping_cost + tax_amount,
            "shipping_cost":this.shipping_cost,
            "tax":tax_amount}






          this.nodeapi.addToCart(data).subscribe((response)=>{
            // localStorage.removeItem('cart')
            localStorage.setItem('cart',JSON.stringify(this.number))
            alert("cart is updated");
            this.route.navigate(['/customer/cart'])


          })

          }else if(res.message!=="Cart is Empty"){
            console.log("document",doc)
            price = res.data[0].total+price;
            tax_amount = price/(1+(this.tax/100));
            let total_quantity = res.data[0].total_quantity+this.number;
            let bundle={
              "supplier_id":doc.supplier_id,
              "bundle_id":doc.bundle_number,
              "bundle_name":doc.product_name,
              "net_area":net_area,
              "thickness":doc.dimension[0].thickness,
              "quantity":number,
              "total":price,
              "Dimension":[{
                "width":100,
                "height":200,
                "unit":"inch"
              }]}

              res.data[0].bundle.push(bundle)
            let data_updated = {"user_id":this.auth.getUser()._id,
            "bundle":res.data[0].bundle,

            "total_quantity":total_quantity,

            "total_amount":cart_total,

            "cart_total":cart_total+this.shipping_cost+tax_amount,

            "shipping_cost":this.shipping_cost,

            "tax":tax_amount
          }


              // res.data[0].bundle.push(data_updated)

              this.nodeapi.addToCart(data_updated).subscribe((res)=>{

                localStorage.removeItem('car')
                localStorage.setItem('cart',total_quantity)
                console.log(total_quantity)
                this.route.navigate(['/customer/cart'])
              })


          }

        }
      })
    }
    else if(number<1){
      alert("Slabs count can not be zero")
    }
  }
  viewMore(type){

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
        console.log(this.items)
      }

    })
  }


  incCount() {

    if(this.number <= 5 ) {
    this.number += 1;
    }

  }

  decCount() {

    if(this.number >= 1) {
      this.number -= 1;
    }

  }


}
