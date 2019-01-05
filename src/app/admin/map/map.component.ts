
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
  marker_arr:any;
  order = []

  orderDetail = {
    "block_no":123,
    "type":"Granite",
    "price":0,
    "Bundle_count":0,
    "Net_weight":100,
    "gross_weight":100
  }

  constructor(private nodeApi:NodeapiService,private adminApi:AdminApiService) {
      this.getData();
    this.marker_arr = []
    
      setTimeout(()=>{
        this.filterData()
      },4000);

    
   }
 

  ngOnInit() {
    //12.934775, lng: 12.934775
    var mapProp = {
      center: new google.maps.LatLng(12.934775, 12.934775),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true,
      key:''
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
   //pending - supplier[0]
            //accepted - supplier[0]
            //shipped - port (7 upload contry,port) update order collection
            
            //arrived - customer port
            //delivered - customer 


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
      obj['country'] = port[0]['country'];
      console.log('port',port)
      obj['lat'] = port[0]['lat']
      obj['lng'] = port[0]['lng']
      obj['order'] = element;
      this.order.push(obj)
    }
    if(element['cancel_status'] === 'Accepted'){ 
     
        let obj = {}
        obj['status'] = element['cancel_status']
        let port = this.ports.filter(function(el){
          return el['port_name'] === element['port']
        })
        console.log('port',port)
        obj['country'] = port[0]['country']
        obj['order'] = element;
        obj['lat'] = port[0]['lat']
        obj['lng'] = port[0]['lng']
        this.order.push(obj)


    }
    if(element['cancel_status'] === 'Shipped'){
      // supplier port need to fix
       let obj ={} 
      obj['status'] = element['cancel_status']
      let port = this.ports.filter(function(el){
        return el['port_name'] === element['port']
      })
      obj['country'] = port[0]['country']
      console.log("port",port);
      obj['order'] = element;
      console.log(port)
      obj['lat'] = port[0]['lat']
      obj['lng'] = port[0]['lng']
      this.order.push(obj)
    }

    if(element['cancel_status'] === 'Arrived'){
      let obj = {

      } 
      obj['status'] = element['cancel_status']
      let user = this.user.filter(function(el){
        return el['_id'] === element['user_id'][0]
      })
      obj['country'] = user[0]['country']
      console.log("user",user)
      obj['order'] = element;
      console.log('deliver',user)
      obj['lat'] = user[0]['lat']
      obj['lng'] = user[0]['lng']
      this.order.push(obj)

    }

    if(element['cancel_status'] === 'Delivered'){
      let obj = {

      } 
      obj['status'] = element['cancel_status']
      let user = this.user.filter(function(el){
        return el['_id'] === element['user_id'][0]
      })
      obj['country'] = user[0]['country']
      obj['order'] = element;
      console.log('deliver',user)
      obj['lat'] = user[0]['lat']
      obj['lng'] = user[0]['lng']
      this.order.push(obj)

    }



    
    
  });
  this.displayMarker('usa')
  console.log('order filter',this.order)

}else{
  alert("please try again")
}

}

displayMarker(country){
  var marker;
  
  this.order.forEach(item=>{
    if(item['country'] === country){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(item['lat'], item['lng']),
      map: this.map
 });
 this.marker_arr.push(marker);


 var contentString = '<div id="content">'+
 '<div id="siteNotice">'+
 '</div>'+
 '<h1 id="firstHeading" class="firstHeading">'+item['order']['name']+'</h1>'+
 '<div id="bodyContent">'+
 '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
 'sandstone rock formation in the southern part of the '+
 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
 'south west of the nearest large town, Alice Springs; 450&#160;km '+
 '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
 'Aboriginal people of the area. It has many springs, waterholes, '+
 'rock caves and ancient paintings. Uluru is listed as a World '+
 'Heritage Site.</p>'+
 '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
 '(last visited June 22, 2009).</p>'+
 '</div>'+
 '</div>';

var infowindow = new google.maps.InfoWindow({
content: contentString
});
marker.addListener('click', ()=>{
  this.orderDetail['block_no'] = item['order']['products'][0]['bundle_id']
  this.orderDetail['type'] = 'marble'
  this.orderDetail['color'] = 1
  console.log(item['order']['total'])
  this.orderDetail['price'] = item['order']['total']
  this.orderDetail['bundle_count'] = 1
  this.orderDetail['net_weight'] = 1
  this.orderDetail['gross_weight'] = 1
  infowindow.open(this.map, marker);
});

}

  })


}

onChange(event){
  if(typeof this.marker_arr !== 'undefined')
  this.clearOverlays();
  this.displayMarker(event.target.value.toLowerCase())
}
clearOverlays() {
  for (var i = 0; i < this.marker_arr.length; i++ ) {
    this.marker_arr[i].setMap(null);
  }
  this.marker_arr.length = 0;
}


 
}


