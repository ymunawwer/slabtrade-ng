import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { country_state_city } from 'src/assets/js/country-state-city/index.js'
// import { country_state_city } from 'country-state-city';
// declare var country:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  err:boolean;
  loading = false;

  constructor(private auth:AuthService,private router:Router, ) {
   this.err  = true;
  //  console.log("country",JSON.stringify(this.country.getAllCountries()));
   if (auth.isAuthenticated()) {
    router.navigate(['/admin/home']);
  }

  }

  ngOnInit() {
    
  }
  @ViewChild('f') myForm;
  ngAfterViewInit(){
    this.myForm.valueChanges.subscribe(data =>{
      console.log('Form changes', data);
      this.err = true

    })
  }



  onSubmit(form:NgForm){
    if(!form.invalid){
    let login_data = {'email':form.value.email,'password':form.value.password}

    this.loading = true;

    this.auth.doAdminLogin(login_data).subscribe((res)=>{

      sessionStorage.setItem('currentUser',JSON.stringify(res));
      if(this.auth.getUser().roles[0]==='supplier'){
        this.router.navigate(['/supplier']);
      console.log(JSON.stringify(res))

      }else if(this.auth.getUser().roles[0]==='customer'){
        let cart = res['user_detail']['total_quantity'];
        console.log("cart",cart)
        if(cart != undefined){
        localStorage.setItem('cart',cart);
        }else {
          localStorage.setItem('cart',JSON.stringify(0));
        }
        this.router.navigate(['/customer']);
        console.log(JSON.stringify(res))

      }else if(this.auth.getUser().roles[0]==='admin'){
      this.router.navigate(['/admin/home']);
      console.log(JSON.stringify(res))
      }
    this.loading = false;

    },(error)=>{
    this.loading = false;

      this.err = false;

    })
    // console.log('form')
  }
}

}
