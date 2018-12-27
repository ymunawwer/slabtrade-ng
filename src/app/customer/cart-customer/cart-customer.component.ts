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
  amount;
  shipping:number;
  shipping_detail:any;
  total:number;
  port_list;
  total_item:number;
  is_check_out:boolean;
  iscartempty:boolean;
  name;
  unload:boolean;
  user:any;
  port:any;
  constructor(private nodeapi:NodeapiService,private nodeApi:NodeapiService,private location:PlatformLocation,private auth:AuthService,private router:Router) {
    this.unload= true;
    this.port = "Chennai";
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
    this.getPort();
    this.location.onPopState(() => {
      this.is_check_out = false
      

  });

  
   }

  ngOnInit() {
    feather.replace();
  }
  async getPort(){
   
    await this.nodeapi.getPortDetailBycountry(this.user.address1_country).subscribe((result)=>{
      console.log(result);
      this.port_list = result['data']
    })
    console.log(this.port_list);
  }
  

  getCartItem(){
    this.nodeApi.getCart("0").subscribe((res)=>{
      if(res.error_code===200){
        if(res.message!=="Cart is Empty"){
          console.log("cart up",res)
          this.amount = res['data'][0]['total_amount']
          this.tax = res['data'][0]['tax'];
          this.shipping = res['data'][0]['shipping_cost'];
          this.total = res.data[0]['cart_total'];
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
    
    console.log(this.user);
    let shipping_addr = {
      'street':this.user.address2_street,
      'city':this.user.address2_city,
      'state':this.user.address2_state,
      'country':this.user.address2_country,
      'zip':this.user.address2_zip

    }
    
    
    this.onCheckout("cash",this.tax,this.shipping,this.total,shipping_addr,this.port,this.unload);
  }



  onCheckout(payment,tax,service,total,shipping_addr,port,unload){

    this.nodeApi.checkOut(payment,tax,service,total,shipping_addr,port,unload).subscribe((result)=>{
      console.log(result)
      if(result['message']==='Container is not full'){
        alert("Please add more item to your cart")
      }else if(result['message']!=='Container is not full'){
        // localStorage.setItem('cart',JSON.stringify(0))
        alert("Order is succefully placed");
        localStorage.setItem('cart',JSON.stringify(0));
        this.router.navigate(['/']);


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


  remove(item){

    // this.tax = res['data'][0]['tax'];
    // this.shipping = res['data'][0]['shipping_cost'];
    // this.total = res.data[0]['cart_total'];
    // this.cart_item = res.data[0].bundle;
    // this.total_item = res.data[0].total_quantity;


    
    console.log(item);
    // delete this.cart_item[i];
    this.nodeApi.removeCartItem(item['_id']).subscribe((res)=>{
      console.log(res)
      console.log("total",this.total)
      console.log("tax",this.port_list[0]['tax_percentage'])
      


      if(res['error_code'] ===200){
        let tax_cal = (1+(this.port_list[0]['tax_percentage']/100));
        let data;
        if(this.total_item - item['quantity']!==0){
          data = {
            "id":this.auth.getUser()['_id'],
            "cart_total":(this.amount- item['total'])+((this.amount- item['total'])/tax_cal) + this.port_list[0]['shipping_cost'],
            "tax":(this.amount- item['total'])/tax_cal,
            "total_amount":this.amount - item['total'],
            "total_quantity":this.total_item - item['quantity']
          }

        }else if(this.total_item - item['quantity']===0){
          data = {
            "id":this.auth.getUser()['_id'],
            "cart_total":(this.amount- item['total'])+((this.amount- item['total'])/tax_cal),
            "tax":(this.amount- item['total'])/tax_cal,
            "total_amount":this.amount - item['total'],
            "total_quantity":this.total_item - item['quantity']
          }
        }
        
        this.nodeapi.cartRecalculate(data).subscribe((res)=>{
          alert("Succesfully removed")
          localStorage.setItem("cart",JSON.stringify(this.total_item - item['quantity']));
          window.location.reload();
          this.getCartItem();
          
        })

        
     
      }else if(res['error_code'] ===500){
        alert("Please try again later.")
      }
    },(err)=>{
      alert("Please try again later.")
    })
  }


  


}
