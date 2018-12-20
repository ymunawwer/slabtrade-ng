import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  flag=0;
  cart_count:number;
  session;
  first_name:string;
  is_authenticated =false;
  user_detail;
  constructor(private router:Router) {
    
    this.user_detail=JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.user_detail!==null){
    console.log('user_detail',this.user_detail['user_detail'])
    this.first_name = this.user_detail['user_detail']['user_detail']['alias'];
    
    this.session = localStorage.getItem('cart');
    if(this.session!==undefined){
      if(this.session!==null){
         if(this.user_detail['token']!==null){
           this.is_authenticated = true;
         }
        
          this.session = JSON.parse(this.session);
          this.cart_count = this.session;



      // console.log("seesion",this.session['user_detail']['total_quantity'])
 
      // this.cart_count = JSON.parse(localStorage.getItem('cartCount'));
      // this.flag = 1
    }
  }
}
    // this.cart_count = this.session['user_detail']['user_detail']['total_quantity'];
   }

  ngOnInit() {
  }



  onLogout(){
    sessionStorage.removeItem("currentUser");
    window.location.reload();
   
    

  }


}
