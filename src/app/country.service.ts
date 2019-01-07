import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService { country :string = '../assets/js/country-state-city/lib/country.json';
state :string = '../assets/js/country-state-city/lib/state.json'
city :string = '../assets/js/country-state-city/lib/city.json'
constructor(private http:HttpClient) {
  this.state_list = [];
  this.city_list = []
  this.country_list = []
  this.allState();
  this.allCity();
  this.allCountries();
 }
state_list:any;
city_list:any;
country_list:any;

allCountries(){
  this.http.get(this.country).subscribe(res=>{
    console.log('con',res)
    this.country_list = res
  
  })
}
allState() {
  this.http.get(this.state).subscribe(res=>{
    this.state_list = res
  
  })
}

getAllCountry(){
  return this.country_list;
}


allCity(){
  this.http.get(this.city).subscribe(res=>{
    console.log('city',res)
    this.city_list = res
  
  })

}

filterState(id){
  // console.log('st list',this.state_list)
  let country = this.country_list.filter(cont=>cont['name']===id)
  console.log('filt country',country[0]['id'])
  let state = this.state_list.filter(st=>st['country_id']===country[0]['id']
  )
  return state;
}
filterCity(id){
  // console.log('st list',this.state_list)
  let state = this.state_list.filter(state=>state['name']===id)
  let city = this.city_list.filter(st=>st['state_id']===state[0]['id']
  )
  return city;
}



}
