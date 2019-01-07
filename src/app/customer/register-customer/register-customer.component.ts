import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service'
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../country.service'
import { timeout } from 'q';

declare var $: any;

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.sass']
})
export class RegisterCustomerComponent implements OnInit {
  stateInfo: any;
  countryInfo: any;
  cityInfo: any;
  mailingStateInfo: any;
  mailingCountryInfo: any;
  mailingCityInfo: any;


  constructor(private auth:AuthService,private route:Router,private country:CountryService) {
    this.getCountries();
    this.countryInfo = []
    this.stateInfo = []
    this.mailingStateInfo = []
    this.mailingCountryInfo = [] 
    this.mailingCityInfo= []
   }

  @ViewChild('f') formRef;

  ngOnInit() {
    
  }


  ngAfterViewInit(){
    this.formRef.valueChanges.subscribe(data =>{
      console.log('Form changes', data);

    });
  //   $('.country').select2({
  //     placeholder: 'Select Country'
  // });
  }



  onSubmit(form:NgForm){
    console.log(form.value);
    var d = new Date();
    var n = d.getMonth();

    // console.log(form)
    let alias = 'CUS'+'-'+n+'-'+d.getTime();
    console.log(alias)
    var data = {'alias':alias,'data':form.value}
    this.auth.doRegister(data).subscribe((res)=>{
      console.log(res)
      if(res['error_code']===200){
        if(res['message']==='user register Succesfully'){
          alert('Thank you for registering with us.');
          this.route.navigate(['/']);

        }else{
          alert("Email or cell phone already register please try with different.")
        }
        }else if(res['error_code']===500){
          alert("Please try with different email or try after some time.")

        }






    },(err)=>{
      alert("Please try with different email or try after some time.")
    })


  }

  getCountries(){
        setTimeout(()=>{
          this.countryInfo=this.country.getAllCountry();
          console.log('Data:', this.countryInfo);
        },300)
       
   
  }

  onChangeCountry(countryValue) {
    console.log('country',countryValue)
    // countryValue = JSON.parse(countryValue)+1;
    this.stateInfo=this.country.filterState(countryValue);
    console.log('state',this.stateInfo)
    // this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue) {
    console.log('state',stateValue)
    // stateValue = JSON.parse(stateValue)+1;
    this.cityInfo=this.country.filterCity(stateValue);
    console.log('city',this.cityInfo)
    //console.log(this.cityInfo);
  }


  onChangeMailingCountry(countryValue) {
    console.log('country',countryValue)
    // countryValue = JSON.parse(countryValue)+1;
    this.mailingStateInfo=this.country.filterState(countryValue);
    console.log('state',this.stateInfo)
    // this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeMailingState(stateValue) {
    console.log('state',stateValue)
    // stateValue = JSON.parse(stateValue)+1;
    this.mailingCityInfo=this.country.filterCity(stateValue);
    console.log('city',this.cityInfo)
    //console.log(this.cityInfo);
  }

  

}
