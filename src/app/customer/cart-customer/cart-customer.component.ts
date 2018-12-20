import { Component, OnInit } from '@angular/core';
import { NodeapiService } from '../../nodeapi.service';
import { PlatformLocation } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

declare var feather:any;
@Component({
  selector: 'app-cart-customer',
  templateUrl: './cart-customer.component.html',
  styleUrls: ['./cart-customer.component.sass']
})
export class CartCustomerComponent implements OnInit {
  cart_item:any;
  tax:number;
  shipping:number;
  total:number;
  total_item:number;
  is_check_out:boolean;
  iscartempty:boolean;
  name;
  user:any;
  port:any;
  constructor(private nodeApi:NodeapiService,private location:PlatformLocation,private auth:AuthService,private router:Router) {
    
    this.cart_item = []
    this.getCartItem();
    this.is_check_out = false;
    this.user = {
      "first_name":this.auth.getUser().first_name,
      "contact":this.auth.getUser().cell_phone,
      "last_name":this.auth.getUser().last_name,
      "address1_street":this.auth.getUser().address,
      "address1_city":this.auth.getUser().city,
      "address1_state":this.auth.getUser().state,
      "address1_country":this.auth.getUser().country,
      "address1_zip":this.auth.getUser().zip,
      "address2_street":this.auth.getUser().mailing_address,
      "address2_city":this.auth.getUser().mailing_city,
      "address2_state":this.auth.getUser().mailing_state,
      "address2_country":this.auth.getUser().mailing_country,
      "address2_zip":this.auth.getUser().mailing_zip
    
    };

    this.location.onPopState(() => {
      this.is_check_out = false
      

  });
   }

  ngOnInit() {
    feather.replace();
  }

  

  getCartItem(){
    this.nodeApi.getCart("0").subscribe((res)=>{
      if(res.error_code===200){
        if(res.message!=="Cart is Empty"){
          console.log("cart up",res)
          this.tax = res.data.tax;
          this.shipping = res.data.total;
          this.total = res.data[0].cart_total;
          this.cart_item = res.data[0].bundle;
          this.total_item = res.data[0].total_quantity;
          
          this.iscartempty = false;
          console.log(this.cart_item);

        }else if(res.message==="Cart is Empty"){
          this.iscartempty = true;
          alert("cart is empty")

        }
       

      }else{
        alert("Please try again");
      }
     
    })

  }

confirmToCheckOut(){
  this.is_check_out =true;

}

  shippingDetail(form:NgForm){
   
    // this.user.port = form.value.port;
    // this.user.un_load_facility = form.value.radio;
   
    // this.nodeApi.getPortDetail(this.user.port).subscribe((result)=>{
    //   this.port = result;
    // })
    let tax = 100;
    let total=1000;
    console.log(this.user);
    
    this.onCheckout("cash",tax,"10",total);
  }



  onCheckout(payment,tax,service,total){

    this.nodeApi.checkOut(payment,tax,service,total).subscribe((result)=>{
      console.log(result)
      if(result['message']==='Container is not full'){
        alert("Please add more item to your cart")
      }else if(result['message']!=='Container is not full'){
        // localStorage.setItem('cart',JSON.stringify(0))
        alert("Order is succefully placed");


      }
      
      // this.router.navigate([''])

    },(err)=>{
      console.log(err);
      alert("Something went Wrong.please try again later.");
    })


  }


  clearCart(){
    this.nodeApi.clearCart().subscribe((result)=>{
      if(result['error_code']===200){

        if(result['message']==="Not found"){
          this.iscartempty = true;
          localStorage.setItem('cart',"0");
        }else{
          this.iscartempty = false;
          var x = "0";
          localStorage.setItem('cart',x);
          window.location.reload();
        }


      }else{
        alert("Please try again")
      }
      
     


    })
  }


  remove(i){
    
    console.log(i,this.cart_item[i]);
    delete this.cart_item[i];
  }


  


}
