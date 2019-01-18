import { Component, Renderer, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { AuthService } from '../../auth.service';
import {NodeapiService} from '../../nodeapi.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
declare var $:any;
declare var feather:any;
@Component({
  selector: 'app-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.sass']
})
export class CreateBundleComponent implements OnInit, AfterViewInit {
  length_of_aray;
  t_unit;
  inspection_report;
  deal_data = {
    'first_name':'',
    
    'dateRange': '',
    'start_date': '',
    'end_date': '',
    'offer_value': '',
    'isoffer':0
  };

  @ViewChild('mainF') formRef;



  loading = false;
  globalInstance: any;
  unit:String;
  dimension:any;
  flag:number;
  file:any;
  thickness_new;
  isdimensionsave;
  aray:any;
 bundle = {
   'product_name':'',
    'type':'',
    'supplier_id':'',
    'product_type':'',
    'product_type_code':1,
    'quality':'',
    'no_of_slabs': 1,
    'price':'',
    'color':'',
    'dimension':[{
      'width':0,
      'height':0,
      'thickness':0,


    }],


      'width':0,
      'height':0,
      'thickness':0,
      'unit':'',


    'weight':0.0,
    'bundle_number':'',
    'slab_weight':0,
    'net_area':0.0,
    'net_weight':0.0,
    // 'product_description':'',
    // 'bundle_description':'',
    'inspection_report':'',

    'preference': ''


 }

new_color = {
  'name':'',
  'code':''
}

  constructor(private ren:Renderer,private renderer: Renderer2,private auth:AuthService,private node:NodeapiService,private route:Router) {
    this.unit = "inch";
    this.t_unit="cm"
    this.inspection_report = []
    this.dimension = [];
    this.isdimensionsave = false;
    this.aray=[];
    this.bundle.supplier_id = this.auth.getUser()._id;
    this.file =[];
    
   }

  ngOnInit() {
    feather.replace();
   this.createRange(1)
   $('#close0').css('visibility', 'hidden');
   $('#close1').css('visibility', 'hidden');
   $('#close2').css('visibility', 'hidden');
   $('#close3').css('visibility', 'hidden');
   $('#close4').css('visibility', 'hidden');
    // profile image upload preview
    function readURL(input, preview) {
      if (input.files && input.files[0]) {
          const reader = new FileReader();

          reader.onload = function(e) {
              $('#' + preview + '_image_preview').css('background-image', 'url(' + e.target['result']+ ')');
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

    $('#prev_img_upload_btn').change(function() {
      $('#close0').css('visibility', 'visible');
      readURL(this, 'prev');
  });

  $('#other_img_upload_btn').change(function() {
    $('#close1').css('visibility', 'visible');
      readURL(this, 'other');
  });

  $('#other2_img_upload_btn').change(function() {
    $('#close2').css('visibility', 'visible');
      readURL(this, 'other2');
  });

  $('#other3_img_upload_btn').change(function() {
    $('#close3').css('visibility', 'visible');
      readURL(this, 'other3');
  });
  $('#other4_img_upload_btn').change(function() {
    $('#close4').css('visibility', 'visible');
      readURL(this, 'other4');
  });


  }

  ngAfterViewInit() {
    this.formRef.valueChanges.subscribe(data => {

      console.log(data);


    });
  }
  weightChange(event){
    console.log("hello",event.target.value,this.aray.length)
    this.length_of_aray = this.aray.length===0?1:this.aray.length;
    
    this.bundle.net_weight = JSON.parse((this.bundle['weight']*this.length_of_aray).toFixed(2));
  }


  createRange(number) {
    console.log('called');
    this.inspection_report = []
    this.aray = [];

  //   if(this.aray.length < number) {
  //   for (let i = this.aray.length; i < number; i++) {
  //      this.aray.push({'width': this.bundle.width, 'height': this.bundle.height, thickness: this.thickness_new});
  //   }
  // } else if (this.aray.length > number) {

  //   for (let i= number; i< this.aray.length; i++) {
  //     this.aray.pop();
  //   }

  // }

  for (let i = 0; i < number*6; i++) {
         this.aray.push({'width': this.bundle.width, 'height': this.bundle.height, thickness: this.thickness_new});
      //    if(i/6===0){
      //    this.inspection_report.push({'key': 'key-'+i, 'value': ''});
      // }
    }
    for (let i = 0; i < number; i++) {
      // this.aray.push({'width': this.bundle.width, 'height': this.bundle.height, thickness: this.thickness_new});
   //    if(i/6===0){
      this.inspection_report.push({'key': 'key-'+i, 'value': ''});
   // }
 }

  let area = 0;

    this.dimension = this.aray;
    this.dimension.forEach((el)=>{
      console.log(el)
      area = area+(el['width']*el['height'])/144
      console.log(area)
    })
    this.bundle.net_area = JSON.parse(area.toFixed(2));
    console.log(typeof this.thickness_new)
    // if(typeof this.thickness_new!=='undefined'){
      
      this.aray.forEach(element => {
        // this.bundle.net_weight = JSON.parse(((this.bundle.net_area*this.thickness_new) / 166).toFixed(2));
        
      });
      // console.log(this.bundle['weight']*this.aray.length)
      this.bundle.net_weight = JSON.parse((this.bundle['weight']*this.aray.length).toFixed(2));
    // }
    this.bundle.dimension = this.dimension;


  }

  allFilesToUpload(event,key){


    // document.getElementById('inputGroupFile07_label').innerText = event.target.files[0]['name'];
console.log(event.target.files)
    this.file.push({"key":key,"value":<File>event.target.files})


  }


  removeImage(key){
    console.log(this.file)
    if(key==='key0'){
    
        $('#prev_image_preview').css('background-image', 'url(https://via.placeholder.com/500x500?text=Select+Preview+Image)');
        $('#close0').css('visibility', 'hidden');
  
  

    }else if(key==='key1'){
      $('#other_image_preview').css('background-image', 'url(https://via.placeholder.com/500x500?text=Select+Other+Image)');
      $('#close1').css('visibility', 'hidden');
    }else if(key==='key2'){
      $('#other2_image_preview').css('background-image', 'url(https://via.placeholder.com/500x500?text=Select+Other+Image)');
      $('#close2').css('visibility', 'hidden');
    }else if(key==='key3'){
      $('#other3_image_preview').css('background-image', 'url(https://via.placeholder.com/500x500?text=Select+Other+Image)');
      $('#close3').css('visibility', 'hidden');
    }else if(key==='key4'){
      $('#other4_image_preview').css('background-image', 'url(https://via.placeholder.com/500x500?text=Select+Other+Image)');
      $('#close4').css('visibility', 'hidden');
    }
    this.file = this.file.filter(function(item){
      console.log(item['key'],key)
      console.log(item['value'])
      return item['key']!==key
    })
    console.log(this.file)
  }



  onCreateBundle(){
    console.log('this.bundle', this.bundle);
    var file_array = []
    // this.file = []
    this.file.forEach(element => {
      file_array.push(element['value'])
      
    });
    this.deal_data['first_name'] = this.auth.getUser()['first_name']
    if(typeof this.deal_data['offer_value']!==undefined && this.deal_data['offer_value']!==''){
    this.deal_data['isoffer'] = 1
    }
    this.bundle.thickness = this.thickness_new
    this.bundle.dimension[0].thickness = this.thickness_new;
    this.bundle.unit = <string>this.unit;
    const formData:any = new FormData();
    const file: Array<File> = file_array;
    for (let [key, value] of Object.entries(this.bundle)) {
      if(key==="dimension"){
        // alert(JSON.stringify(value))
        formData.append(key,JSON.stringify(value))

      }
      else if(key!=="dimension"){
      formData.append(key,value)
      }
    }

    const data = this.deal_data;

    this.deal_data.start_date = data.dateRange ?
     new Date(data.dateRange[0]).getFullYear() + '-' + (new Date(data.dateRange[0]).getMonth() + 1) +
    '-' + new Date(data.dateRange[0]).getDate() : '';

    this.deal_data.end_date = data.dateRange ?
    new Date(data.dateRange[1]).getFullYear() + '-' + (new Date(data.dateRange[1]).getMonth() + 1) +
    '-' + new Date(data.dateRange[1]).getDate() : '';

    for (let [key, value] of Object.entries(this.deal_data)) {


      formData.append(key, value);

    }

    if(file.length === 0) {
      Swal({
        text: 'Please select atleast one image.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      return;
    } else if (this.bundle.inspection_report === '')  {

      let message = '';

      // if(this.bundle.product_description === '') {

      //   message = "Product description is required";

      // }

      // if(this.bundle.bundle_description === '') {
      //   message = message === '' ? 'Bundle description is required' : message + ', Bundle description is required';
      // }

      if(this.bundle.inspection_report === '') {
        message = message === '' ? 'Inspection Report is required' : message + ', Inspection Report is required';
      }

      Swal({
        text: 'Text area fields are not filled, they are required',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

      return;

    }



    // formData.append("bundle_data",this.bundle)
    for(let i =0; i < file.length; i++){

      formData.append("image", file[i][0], file[i][0]['name']);
  }

  console.log('formdata', formData);

  this.loading = true;


    // console.log("bundle",this.bundle)
    this.node.createBundle(formData).subscribe((res)=>{
      // console.log("success")
    this.loading = false;

      Swal({
        text: 'Success',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      this.route.navigate(['/supplier/products'])
    },(err)=>{
    this.loading = false;

      Swal({
        text: 'Please try again.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    })
  }


  // onProductDescriptionChange(ev) {
  //   try {
  //     this.bundle.product_description = ev.target.value;
  //   } catch(e) {
  //     console.info('could not set textarea-value');
  //   }
  // }


  // onBundleDescriptionChange(ev) {
  //   try {
  //     this.bundle.bundle_description = ev.target.value;
  //   } catch(e) {
  //     console.info('could not set textarea-value');
  //   }
  // }

  onInspectionReportChange(ev) {
    try {
      this.bundle.inspection_report = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }


  onUnitChange(event){

    let prev_unit = this.unit;
    console.log("event",event.target.querySelector('input').value)
    // this.bundle.dimension.forEach((item)=>{
      this.unit = event.target.querySelector('input').value

      if(prev_unit==='cm'){
        if(this.unit==='inch'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = JSON.parse((item.height/2.54).toFixed(2));
            this.bundle.dimension[index].width = JSON.parse((item.width/2.54).toFixed(2));
            // this.bundle.dimension[index].thickness = JSON.parse((item.thickness/2.54).toFixed(2));

          })
          this.bundle.net_area = JSON.parse((this.bundle.net_area/6.452).toFixed(2));
          this.bundle.height = JSON.parse((this.bundle.height/2.54).toFixed(2));
            this.bundle.width = JSON.parse((this.bundle.width/2.54).toFixed(2));



        }else if(this.unit==='m'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = JSON.parse((item.height/100).toFixed(2));
            this.bundle.dimension[index].width = JSON.parse((item.width/100).toFixed(2));
            // this.bundle.dimension[index].thickness = JSON.parse((item.thickness/100).toFixed(2));

          })
          this.bundle.net_area = JSON.parse((this.bundle.net_area/10000).toFixed(2));
          this.bundle.height = JSON.parse((this.bundle.height/100).toFixed(2));
            this.bundle.width = JSON.parse((this.bundle.width/100).toFixed(2));





        }else{
          //unit not change
        }
      }else if(prev_unit==='m'){
        if(this.unit==='inch'){
          this.bundle.dimension.forEach((item,index)=>{
            console.log(item.height*39.37)
            this.bundle.dimension[index].height = JSON.parse((item.height*39.37).toFixed(2));
            this.bundle.dimension[index].width = JSON.parse((item.width*39.37).toFixed(2));
            // this.bundle.dimension[index].thickness = JSON.parse((item.thickness*39.37).toFixed(2));

          })
          this.bundle.net_area = JSON.parse((this.bundle.net_area*1550.003).toFixed(2));
          this.bundle.height = JSON.parse((this.bundle.height*39.37).toFixed(2));
            this.bundle.width = JSON.parse((this.bundle.width*39.37).toFixed(2));



        }else if(this.unit==='cm'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = JSON.parse((item.height*100).toFixed(2));
            this.bundle.dimension[index].width = JSON.parse((item.width*100).toFixed(2));
            // this.bundle.dimension[index].thickness = JSON.parse((item.thickness*100).toFixed(2));

          })
          this.bundle.net_area = JSON.parse((this.bundle.net_area*10000).toFixed(2));
          this.bundle.height = JSON.parse((this.bundle.height*100).toFixed(2));
            this.bundle.width = JSON.parse((this.bundle.width*100).toFixed(2));




        }else{
          //unit not change
        }
      }else if(prev_unit==='inch'){
        if(this.unit==='m'){
          this.bundle.dimension.forEach((item,index)=>{
            console.log(item.height/39.37)
            this.bundle.dimension[index].height = JSON.parse((item.height/39.37).toFixed(2));
            this.bundle.dimension[index].width = JSON.parse((item.width/39.37).toFixed(2));
            // this.bundle.dimension[index].thickness = JSON.parse((item.thickness/39.37).toFixed(2));

          })
          this.bundle.net_area = JSON.parse((this.bundle.net_area/1550.003).toFixed(2));
          this.bundle.height = JSON.parse((this.bundle.height/39.37).toFixed(2));
            this.bundle.width = JSON.parse((this.bundle.width/39.37).toFixed(2));



        }else if(this.unit==='cm'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = JSON.parse((item.height*2.54).toFixed(2));
            this.bundle.dimension[index].width = JSON.parse((item.width*2.54).toFixed(2));
            // this.bundle.dimension[index].thickness = JSON.parse((item.thickness*2.54).toFixed(2));

          })
          this.bundle.net_area = JSON.parse((this.bundle.net_area*6.452).toFixed(2));
          this.bundle.height = JSON.parse((this.bundle.height*2.54).toFixed(2));
            this.bundle.width = JSON.parse((this.bundle.width*2.54).toFixed(2));




        }else{
          //unit not change
        }
      }



    // })
  }
  @ViewChild('close') close;
  onDimensionSave(form:NgForm){
    this.dimension = []
    let x = form.value


console.log('form.value', form.value);


  for(let i =0;i<this.bundle.no_of_slabs;i++){
    let obj={};
    Object.keys(form.value).forEach((key)=>{
      if(key.startsWith('dimension['+i+']')){
        if(key==="dimension["+i+"]['width']"){

          obj['width']=this.unitConversion(x[key])

        }
        if(key==="dimension["+i+"]['height']"){

          obj['height']=this.unitConversion(x[key])

        }
      }
    })
    let area = 0

    this.dimension.push(obj);
    this.dimension.forEach((el)=>{
      area = area+(el['width']*el['height'])
      console.log(area)
    })
    this.bundle.net_area = area;
    // this.bundle.net_weight = (this.bundle.net_area*this.thickness_new) / 166;
    // this.aray.forEach(element => {
    //   // this.bundle.net_weight = JSON.parse(((this.bundle.net_area*this.thickness_new) / 166).toFixed(2));
    //   this.bundle.net_weight =(this.bundle.net_weight+ this.bundle.weight+0);
    // });
    console.log('this.dimension', this.dimension);
  }
  // console.log(this.dimension)
  this.bundle.dimension=this.dimension;


  }
  dimensionKeyUp(event){

    console.log(this.aray);
  }














  unitConversion(value){

    let prev_unit = this.unit;



      if(prev_unit==='cm'){
        if(this.unit==='inch'){

          return value/2.54;






        }else if(this.unit==='m'){

            return value/100;




        }else{
          return value;
        }
      }else if(prev_unit==='m'){
        if(this.unit==='inch'){

            return value*39.37;



        }else if(this.unit==='cm'){

            return value*100;





        }else{
          return value;
        }
      }else if(prev_unit==='inch'){
        if(this.unit==='m'){

            return value/39.37;




        }else if(this.unit==='cm'){

            return value*2.54;





        }else{
          return value;
        }
      }



    // })
  }

  setColor(val){
    this.bundle.color = val;
    console.log(this.bundle.color);
  }


  setType(val){

    this.bundle.product_type = val;
    console.log(this.bundle.product_type);

  }


}
