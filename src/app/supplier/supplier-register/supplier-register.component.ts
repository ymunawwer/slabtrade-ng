import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AuthService} from '../../auth.service'
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../country.service'
import Swal from 'sweetalert2';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

declare var $: any;

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.sass']
})
export class SupplierRegisterComponent implements OnInit , AfterViewInit {
  stateInfo: any;
  countryInfo: any;
  cityInfo: any;
  mailingStateInfo: any;
  mailingCountryInfo: any;
  mailingCityInfo: any;

  data = {
    'address': '',
    'state': '',
    'city': '',
    'country': '',
    'zip': '',
    'mailing_address': '',
    'mailing_state': '',
    'mailing_city': '',
    'mailing_country': '',
    'mailing_zip': ''
  };

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;


  constructor(private auth:AuthService,private router:Router,private country:CountryService) {
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

  public handleAddressChange(address: Address) {
    console.log('address', address);
    for (let i = 0; i < address.address_components.length; i++) {

      if (address.address_components[i].types[0] === 'street_number') {

          this.data.address = address.address_components[i].long_name;

      }

      if (address.address_components[i].types[0] === 'route') {

        this.data.address = this.data.address + ' ' + address.address_components[i].long_name;

      }



      if (address.address_components[i].types[0] === 'sublocality_level_1') {

        this.data.address = this.data.address + ' ' + address.address_components[i].long_name;

      }

      if (address.address_components[i].types[0] === 'locality') {

        this.data.address = this.data.address === '' ?  address.address_components[i].long_name : this.data.address;

      }

      if (address.address_components[i].types[0] === 'country') {

        this.data.country = address.address_components[i].long_name;

      }

      if (address.address_components[i].types[0] === 'administrative_area_level_1') {

        this.data.state = address.address_components[i].long_name;

      }

      if (address.address_components[i].types[0] === 'administrative_area_level_2') {

        this.data.city = address.address_components[i].long_name;

    }

    if (address.address_components[i].types[0] === 'postal_code') {

      this.data.zip = address.address_components[i].long_name;

  }

  console.log('data', this.data);

    }
}

public handleMailingAddressChange(address: Address) {
  console.log('address', address);
  for (let i = 0; i < address.address_components.length; i++) {

    if (address.address_components[i].types[0] === 'street_number') {

        this.data.mailing_address = address.address_components[i].long_name;

    }

    if (address.address_components[i].types[0] === 'route') {

      this.data.mailing_address = this.data.mailing_address + ' ' + address.address_components[i].long_name;

    }



    if (address.address_components[i].types[0] === 'sublocality_level_1') {

      this.data.mailing_address = this.data.mailing_address + ' ' + address.address_components[i].long_name;

    }

    if (address.address_components[i].types[0] === 'locality') {

      this.data.mailing_address = this.data.mailing_address === '' ?
      address.address_components[i].long_name : this.data.mailing_address;

    }

    if (address.address_components[i].types[0] === 'country') {

      this.data.mailing_country = address.address_components[i].long_name;

    }

    if (address.address_components[i].types[0] === 'administrative_area_level_1') {

      this.data.mailing_state = address.address_components[i].long_name;

    }

    if (address.address_components[i].types[0] === 'administrative_area_level_2') {

      this.data.mailing_city = address.address_components[i].long_name;

  }

  if (address.address_components[i].types[0] === 'postal_code') {

    this.data.mailing_zip = address.address_components[i].long_name;

}

console.log('data', this.data);

  }
}

sameAsOriginalAddress(data) {

console.log('data', data.currentTarget.checked);

if(data.currentTarget.checked) {


  this.data.mailing_address = this.data.address;
  this.data.mailing_city = this.data.city;
  this.data.mailing_country = this.data.country;
  this.data.mailing_state = this.data.state;
  this.data.mailing_zip = this.data.zip;

} else {

  this.data.mailing_address = '';
  this.data.mailing_city = '';
  this.data.mailing_country = '';
  this.data.mailing_state = '';
  this.data.mailing_zip = '';

}


}



  onSubmit(form:NgForm){
    var d = new Date();
    var n = d.getMonth();

    // console.log(form)
    let alias = 'SUP'+'-'+n+'-'+d.getTime();
    console.log(alias)
    var data = {'alias':alias,'data':Object.assign(form.value, this.data)}
    this.auth.doSupplierRegister(data).subscribe((res)=>{
      console.log(res)
      if(res['error_code']===200){
        if(res['message']==='Supplier register Succesfully'){
          Swal({
            text: 'Thank you for registering with us.',
            type: 'success',
            confirmButtonText: 'ok',
            confirmButtonColor: '#0a3163'
          });
          this.router.navigate(['/login']);

        }else{
          Swal({
            text: 'Email or cell phone already register please try with different.',
            type: 'error',
            confirmButtonText: 'ok',
            confirmButtonColor: '#0a3163'
          });
        }
        }else if(res['error_code']===500){
          Swal({
            text: 'Please try with different email or try after some time.',
            type: 'error',
            confirmButtonText: 'ok',
            confirmButtonColor: '#0a3163'
          });

        }
    },(err)=>{
      Swal({
        text: 'Please try with different email or try after some time.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
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
