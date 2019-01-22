import { NodeapiService } from './../../nodeapi.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
declare var $: any;
declare var feather: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {
inspection_report;
  deal_data = {

  };
  length_of_aray;
  loading = false;
  file = [];
  images = [];
  dummyArray = [];
  aray:any;
  thickness_new = 0;
  dimension:any;
  unit:String;
  bundle = {
    'product_name': '',
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
       'thickness':0


     }],

     'images': [],

     'net_dimension': [{
      'width': 0,
      'height': 0,
      'unit': 'cm'
    }],

       'width':0,
       'height':0,
       'thickness':0,
       'unit':'',

     'weight':0.0,
     'bundle_number':'',
     'slab_weight':0,
     'net_area':0,
     'net_weight':0.0,
     'product_description':'',
     'Bundle_description':'',
     'inspection_report':'',
     'bundle_weight': 0.0,

     'slab_preference': '',

     'dateRange': [],
    'start_date': '',
    'end_date': '',
    'offer_value': '',
    'deal_product_type': ''


  };

  productId;
  bundleDescription;
  productDescription;
  inspectionReport;

  constructor(private apiService: NodeapiService, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) {
this.inspection_report = []
this.aray = [];
this.unit = 'cm';

   }

  ngOnInit() {
    feather.replace();

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      console.log('id', this.productId);
    });

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
      readURL(this, 'prev');
  });

  $('#other_img_upload_btn').change(function() {
      readURL(this, 'other');
  });

  $('#other2_img_upload_btn').change(function() {
      readURL(this, 'other2');
  });

  $('#other3_img_upload_btn').change(function() {
      readURL(this, 'other3');
  });
  $('#other4_img_upload_btn').change(function() {
      readURL(this, 'other4');
  });


  $('#smartwizard3').smartWizard({
    selected: 0, // Initial selected step, 0 = first step
    keyNavigation: false, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
    autoAdjustHeight: true, // Automatically adjust content height
    cycleSteps: false, // Allows to cycle the navigation of steps
    backButtonSupport: true, // Enable the back button support
    useURLhash: false, // Enable selection of the step based on url hash
    showStepURLhash: false,
    lang: { // Language variables
        next: 'Next',
        previous: 'Previous'
    },
    anchorSettings: {
        anchorClickable: true, // Enable/Disable anchor navigation
        enableAllAnchors: true, // Activates all anchors clickable all times
        markDoneStep: true, // add done css
        enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
    },
});


this.apiService.getProductDetail(this.productId).subscribe(data => {

    if (data['error_code'] === 200) {
      let sum = 0;
      this.bundle = data['data'];
      console.log('product data', this.bundle);
      for (let i = 0; i < this.bundle['dimension'].length; i++) {
            sum += this.bundle['dimension'][i]['width'] * this.bundle['dimension'][i]['height'];
      }
      this.bundle.net_area = sum;

      this.bundle.bundle_weight = this.bundle.no_of_slabs * this.bundle.net_weight;

      this.images = this.bundle['images'];
      this.bundle['quality'] = this.bundle['quality']
      console.log(this.images)
      this.file.push({"key":'key0',"value":this.images[0] ? this.images[0] : null});
      this.file.push({"key":'key1',"value":this.images[1] ? this.images[1] : null});
      this.file.push({"key":'key2',"value":this.images[2] ? this.images[2] : null});
      this.file.push({"key":'key3',"value":this.images[3] ? this.images[3] : null});
      this.file.push({"key":'key4',"value":this.images[4] ? this.images[4] : null});
      console.log('files',this.images);

      this.thickness_new = this.bundle.dimension[0].thickness;

      this.bundle.width = this.bundle.net_dimension[0].width;

      this.bundle.height = this.bundle.net_dimension[0].height;

      this.bundle.slab_preference = this.bundle['preference'];

      this.bundle.dateRange = [new Date(this.bundle.start_date), new Date(this.bundle.end_date)];

      this.aray = this.bundle.dimension;

      this.createRange(this.bundle.no_of_slabs)

      console.log('date range', new Date(this.bundle.start_date));

    } else {
      Swal({
        text: 'Error ocuured',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    }

});


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

  // createRange(number) {
  //   this.dummyArray = [];
  //   this.aray = [];
  //   console.log('number', number);
  //   for(let i = 1; i <= number; i++) {

  //      this.dummyArray.push(i);
  //      this.aray.push(new Object());

  //   }
  //   this.aray = this.bundle.dimension;

  //   if(this.dummyArray.length != this.aray.length) {
  //     for (let i =this.aray.length; i <= this.dummyArray.length; i++) {

  //               this.aray[i] = { width: 0, height: 0, thickness: 0};


  //     }
  //   }

  //   return this.dummyArray;
  // }

  createRange(number) {
    console.log('called');
    this.inspection_report = []
    this.aray = [];

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
      area = area+(el['width']*el['height'])/144
      console.log(area)
    })
    this.bundle.net_area = JSON.parse(area.toFixed(2));
    // this.bundle.net_weight = (this.bundle.net_area*this.thickness_new) / 166;
    this.bundle.net_weight = JSON.parse((this.bundle.net_weight*this.aray.length).toFixed(2));
    this.bundle.dimension = this.dimension;


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

  onDimensionSave(form:NgForm){
    this.dimension = [];
    let x = form.value;





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
      area = area+(el['width']*el['height'])/144;
      el['thickness'] = this.bundle.dimension[0].thickness;
      // console.log(area)
    })
    this.bundle.net_area = area;
    console.log('weight', this.bundle.net_area*this.thickness_new);
    // this.bundle.net_weight = (this.bundle.net_area*this.thickness_new) / 166;
    this.bundle.net_weight = JSON.parse((this.bundle['weight']*this.aray.length).toFixed(2));

      //  this.bundle.bundle_weight = this.bundle.net_weight * this.bundle.no_of_slabs;
  }
  // console.log(this.dimension)
  this.bundle.dimension=this.dimension;


  }

  weightChange(event){
    console.log("hello",event.target.value,this.aray.length)
    this.length_of_aray = this.aray.length===0?1:this.aray.length;

    this.bundle.net_weight = JSON.parse((this.bundle['bundle_weight']*this.length_of_aray).toFixed(2));
  }


  netWeightChanged(value) {

    this.bundle.bundle_weight = value.target.value * this.bundle.no_of_slabs;

  }

  no_of_slab_increased(value) {
    this.bundle.bundle_weight = value.target.value * this.bundle.net_weight;
  }

  onUpdate() {
    // this.bundle['net_weight'] =
    // (this.bundle['dimension'][0]['width'] * this.bundle['dimension'][0]['height'] * this.bundle['dimension'][0]['thickness']) / 166;
    var file_array = []
    // this.file = []
    this.file.forEach(element => {
      console.log(typeof element['value'])


    });
    const formData:any = new FormData();
    const file: Array<File> = file_array;

    for (let i = 0; i < this.file.length; i++) {
       console.log('type', typeof this.file[i].value);
      if(this.file[i]['value'] != null){
      formData.append('image', this.file[i]['value'], this.file[i]['value']['name']);
      }
  }


  console.log('this.bundle', this.bundle);

  const data = this.bundle;

    this.bundle.start_date = data.dateRange.length !== 0 ?
     new Date(data.dateRange[0]).getFullYear() + '-' + (new Date(data.dateRange[0]).getMonth() + 1) +
    '-' + new Date(data.dateRange[0]).getDate() : '';

    this.bundle.end_date = data.dateRange ?
    new Date(data.dateRange[1]).getFullYear() + '-' + (new Date(data.dateRange[1]).getMonth() + 1) +
    '-' + new Date(data.dateRange[1]).getDate() : '';

    if (this.bundle.inspection_report === '')  {

      let message = '';

      // if(this.bundle.product_description === '') {

      //   message = "Product description is required";

      // }

      // if(this.bundle.Bundle_description === '') {
      //   message = message === '' ? 'Bundle description is required' : message + ', Bundle description is required';
      // }

      if(this.bundle.inspection_report === '') {
        message = message === '' ? 'Inspection Report is required' : message + ', Inspection Report is required';
      }


      Swal({
        text: message,
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

      return;

    }


    this.loading = true;

    for (let [key, value] of Object.entries(this.bundle)) {
      if(key==="dimension"){
        formData.append(key,JSON.stringify(value));
      }
      else if(key!=="dimension"){
      formData.append(key,value);
      }
    }


    // const finalData = {data: this.bundle, files: formData};


    this.apiService.updateProduct(formData).subscribe((update_result) => {

    this.loading = false;


      Swal({
        text: 'Bundle Updated.',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

      this.router.navigate(['supplier/products']);
      console.log(update_result);
    }, (err) => {
    this.loading = false;

      Swal({
        text: 'Failed to update.Please try again.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      console.log(err);
    });
  }

  allFilesToUpload(event, index, key) {
    const index2 = JSON.parse(key.substr(3, 4));
    this.file[index2].value =  event.target.files[0];
    $('#close'+key.substr(3,4)).css('visibility', 'visible');
    this.images[index] =  event.target.files[0];
    // this.file.push(<File>event.target.files);


  }

onDimensionChange(form:NgForm){
}
  getBackground(image) {
    if (image) {
      return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    } else {
      return null;
    }

}

dimensionKeyUp(event){

  console.log(this.aray);
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
  let index = JSON.parse(key.substr(3, 4))
  this.images[index] = null
  this.file = this.file.map(function(item){

    item[index]['value'] = null;

    return item;
  });
  console.log(this.file)
}





}
