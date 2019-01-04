
import { Component, OnInit,ViewChild } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service';
import { AdminApiService } from '../../admin-api.service';
import {} from 'googlemaps';
declare var $;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker:google.maps.Marker;
  marker2:google.maps.Marker;
  marker3:google.maps.Marker;
  marker4:google.maps.Marker;
  user:any;
  orders:any;
  ports:any;
  order = []

  constructor(private nodeApi:NodeapiService,private adminApi:AdminApiService) {
      this.getData();
  
    
      setTimeout(()=>{
        this.filterData()
      },4000);

    
   }
 

  ngOnInit() {
    //12.934775, lng: 12.934775
    var mapProp = {
      center: new google.maps.LatLng(12.934775, 12.934775),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    };
    var marker
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  
    this.marker = new google.maps.Marker({position:new google.maps.LatLng(18.5793, 73.8143)})
    this.marker2 = new google.maps.Marker({position:new google.maps.LatLng(18.5794, 73.8144)})
    this.marker3 = new google.maps.Marker({position:new google.maps.LatLng(18.5795, 73.8145)})
    this.marker4 = new google.maps.Marker({position:new google.maps.LatLng(18.5796, 73.8146)})
    this.marker2.setMap(this.map)
    this.marker3.setMap(this.map)
    this.marker4.setMap(this.map)
    this.marker.setMap(this.map)


    
   
  }

// http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCVh6dK0LbT9JKXl-NwvjDKJHKegH7AzhI

// result[0]['geometry']['lat']
// result[0]['geometry']['lng']

getData(){
  this.adminApi.getUser().subscribe((result)=>{
    this.user = result;
    console.log("constructor user",result['data'])
  },(err)=>{
    alert("Fail to load the map.")
  });

  this.adminApi.getOrdes().subscribe((result)=>{
    this.orders = result['data'];
    console.log("constructor orders",result['data'])
  },(err)=>{
    alert("Fail to load the map.")
  });
  this.adminApi.getPort().subscribe((result)=>{
    this.ports = result['data'];
    console.log("constructor port",result['data'])
  },(err)=>{
    alert("Fail to load the map.")
  });
}

filterData(){
  console.log(this.user)
  console.log(this.orders)
  console.log(this.ports)
  if(typeof this.user!=='undefined' && typeof this.orders !=='undefined' && typeof this.ports !=='undefined'){
  this.orders.forEach(element => {
    console.log(element['cancel_status'])
    if(element['cancel_status'] === 'Pending'){
      let obj = {}
      obj['status'] = element['cancel_status']
      let port = this.ports.filter(function(el){
        return el['port_name'] === element['port']
      })
      console.log('port',port)
      obj['lat'] = port[0]['lat']
      obj['lng'] = port[0]['lat']
      this.order.push(obj)
    }
    if(element['cancel_status'] === 'Accepted'){ 
      //  if(element['cancel_status'] === 'Pending'){
      // this.order['status'] = element['cancel_status']
      // let user = this.user.filter(function(el){
      //   return el['role'] === element['port']
      // })
      // this.order['lat'] = port['lat']
      // this.order['lng'] = port['lat']


    }
    if(element['cancel_status'] === 'Shipped'){
       let obj ={} 
      obj['status'] = element['cancel_status']
      let port = this.ports.filter(function(el){
        return el['port_name'] === element['port']
      })
      console.log(port)
      obj['lat'] = port[0]['lat']
      obj['lng'] = port[0]['lat']
      this.order.push(obj)
    }
    if(element['cancel_status'] === 'Delivered'){
      let obj = {

      } 
      obj['status'] = element['cancel_status']
      let user = this.user.filter(function(el){
        return el['_id'] === element['user_id'][0]
      })
      console.log('deliver',user)
      obj['lat'] = user[0]['lat']
      obj['lng'] = user[0]['lat']
      this.order.push(obj)

    }
    
  });
var marker;
  console.log('order filter',this.order)
  this.order.forEach(item=>{
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(item['lat'], item['lng']),
      map: this.map
 });

 

  })
}else{
  alert("please try again")
}

}


 
}


