import { Component, OnInit } from '@angular/core';
import { NodeapiService } from '../../nodeapi.service';
import { PlatformLocation } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


declare var feather:any;
@Component({
  selector: 'app-cart-customer',
  templateUrl: './cart-customer.component.html',
  styleUrls: ['./cart-customer.component.sass']
})
export class CartCustomerComponent implements OnInit {
  loading = false;
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
  unloadRadio: any = 'yes';

  result;

  map = new Map();
  map_total = new Map();


  constructor(private nodeapi:NodeapiService,private nodeApi:NodeapiService,private location:PlatformLocation,private auth:AuthService,private router:Router) {
    this.unload= true;
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

    // this.loading = true;

    await this.nodeapi.getPortDetailBycountry(this.user.address1_country).subscribe((result)=>{
      console.log(result);
      this.port_list = result['data'];
      this.port = this.port_list[0]['port_name'];
      this.loading = false;

    })
    console.log(this.port_list);
  }


  getCartItem(){

    this.loading = true;


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

          this.cart_item.forEach(element => {
              var sup = element['bundle_id'];

               console.log("element",this.map.has(sup));

               if(this.map.has(sup) && this.map_total.has(sup)){
                this.map_total.set(sup, this.map_total.get(sup)+element['total'])
               this.map.set(sup,this.map.get(sup)+element['quantity']);
              //  this.map.set(sup, this.map.get(sup)+element['total']);

               console.log(element['supplier_id'])
               }else{
                   this.map.set(sup,element['quantity'])
                   this.map_total.set(sup, element['total'])


               } });

               console.log("map",this.map);

               console.log('value', this.map.get('31'));


                this.result = this.cart_item.reduce((unique, o) => {
                if(!unique.some(obj => obj.bundle_id === o.bundle_id)) {
                  unique.push(o);
                }
                return unique;
            },[]);
            console.log('result', this.result);







        }else if(res.message==="Cart is Empty"){
          this.iscartempty = true;
          Swal({
            text: 'cart is empty',
            type: 'error',
            confirmButtonText: 'ok',
            confirmButtonColor: '#0a3163'
          });

        }

      this.loading = false;


      }else{
        Swal({
          text: 'Please try again',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });

      }

      this.loading = false;


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

    this.loading = true;

    this.nodeApi.checkOut(payment,tax,service,total,shipping_addr,port,unload).subscribe((result)=>{
      console.log(result)
      if(result['message']==='Container is not full'){
        Swal({
          text: 'Please add more item to your cart',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });

      }else if(result['message']!=='Container is not full'){
        // localStorage.setItem('cart',JSON.stringify(0))
        Swal({
          text: 'Order is succefully placed',
          type: 'success',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
        localStorage.setItem('cart',JSON.stringify(0));
        this.router.navigate(['/']);


      }

      // this.router.navigate([''])

      this.loading = false;


    },(err)=>{
      console.log(err);
      Swal({
        text: 'Something went Wrong.please try again later.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      this.loading = false;
    })


  }


  clearCart(){

    this.loading = true;


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
        Swal({
          text: 'Please try again',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
      }


      this.loading = false;


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

    this.loading = true;

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
          Swal({
            text: 'Succesfully removed',
            type: 'success',
            confirmButtonText: 'ok',
            confirmButtonColor: '#0a3163'
          });

          localStorage.setItem("cart",JSON.stringify(this.total_item - item['quantity']));
          window.location.reload();
          this.getCartItem();

        })



      }else if(res['error_code'] ===500){
        Swal({
          text: 'Please try again later.',
          type: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: '#0a3163'
        });
      }
      this.loading = false;

    },(err)=>{
      Swal({
        text: 'Please try again later.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      this.loading = false;
    })
  }





}
