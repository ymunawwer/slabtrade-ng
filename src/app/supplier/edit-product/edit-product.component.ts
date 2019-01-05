import { NodeapiService } from './../../nodeapi.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
declare var feather: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {

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



  };

  productId;
  bundleDescription;
  productDescription;
  inspectionReport;

  constructor(private apiService: NodeapiService, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) {

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


    } else {
      alert('Error ocuured');
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

  createRange(number) {
    this.dummyArray = [];
    this.aray = [];
    console.log('number', number);
    for(let i = 1; i <= number; i++) {

       this.dummyArray.push(i);
       this.aray.push(new Object());

    }
    this.aray = this.bundle.dimension;

    if(this.dummyArray.length != this.aray.length) {
      for (let i =this.aray.length; i <= this.dummyArray.length; i++) {

                this.aray[i] = { width: 0, height: 0, thickness: 0};


      }
    }

    return this.dummyArray;
  }


  onUnitChange(event){

    let prev_unit = this.unit;
    console.log("event",event.target.querySelector('input').value)
    // this.bundle.dimension.forEach((item)=>{
      this.unit = event.target.querySelector('input').value

      if(prev_unit==='cm'){
        if(this.unit==='inch'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = item.height/2.54;
            this.bundle.dimension[index].width = item.width/2.54;
            this.bundle.dimension[index].thickness = item.thickness/2.54;

          })
          this.bundle.net_area = this.bundle.net_area/6.452;
          this.bundle.height = this.bundle.height/2.54;
            this.bundle.width = this.bundle.width/2.54;



        }else if(this.unit==='m'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = item.height/100;
            this.bundle.dimension[index].width = item.width/100;
            this.bundle.dimension[index].thickness = item.thickness/100;

          })
          this.bundle.net_area = this.bundle.net_area/10000;
          this.bundle.height = this.bundle.height/100;
            this.bundle.width = this.bundle.width/100;





        }else{
          //unit not change
        }
      }else if(prev_unit==='m'){
        if(this.unit==='inch'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = item.height*39.37;
            this.bundle.dimension[index].width = item.width*39.37;
            this.bundle.dimension[index].thickness = item.thickness*39.37;

          })
          this.bundle.net_area = this.bundle.net_area*1550.003;
          this.bundle.height = this.bundle.height*39.37;
            this.bundle.width = this.bundle.width*39.37;



        }else if(this.unit==='cm'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = item.height*100;
            this.bundle.dimension[index].width = item.width*100;
            this.bundle.dimension[index].thickness = item.thickness*100;

          })
          this.bundle.net_area = this.bundle.net_area*10000;
          this.bundle.height = this.bundle.height*100;
            this.bundle.width = this.bundle.width*100;




        }else{
          //unit not change
        }
      }else if(prev_unit==='inch'){
        if(this.unit==='m'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = item.height/39.37;
            this.bundle.dimension[index].width = item.width/39.37;
            this.bundle.dimension[index].thickness = item.thickness/39.37;

          })
          this.bundle.net_area = this.bundle.net_area/1550.003;
          this.bundle.height = this.bundle.height/39.37;
            this.bundle.width = this.bundle.width/39.37;



        }else if(this.unit==='cm'){
          this.bundle.dimension.forEach((item,index)=>{
            this.bundle.dimension[index].height = item.height*2.54;
            this.bundle.dimension[index].width = item.width*2.54;
            this.bundle.dimension[index].thickness = item.thickness*2.54;

          })
          this.bundle.net_area = this.bundle.net_area*6.452;
          this.bundle.height = this.bundle.height*2.54;
            this.bundle.width = this.bundle.width*2.54;




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
      area = area+(el['width']*el['height']);
      el['thickness'] = this.bundle.dimension[0].thickness;
      console.log(area)
    })
    this.bundle.net_area = area;
    console.log('weight', this.bundle.net_area*this.thickness_new);
    // this.bundle.net_weight = (this.bundle.net_area*this.thickness_new) / 166;
       this.bundle.bundle_weight = this.bundle.net_weight * this.bundle.no_of_slabs;
  }
  // console.log(this.dimension)
  this.bundle.dimension=this.dimension;


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

    const formData:any = new FormData();
    const file: Array<File> = this.file;

    for (let i = 0; i < file.length; i++) {

      formData.append('image', file[i][0], file[i][0]['name']);
  }

  console.log('this.bundle', this.bundle);

    this.apiService.updateProduct(this.bundle).subscribe((update_result) => {
      alert('Bundle Updated.');
      this.router.navigate(['supplier/products']);
      console.log(update_result);
    }, (err) => {
      alert('Failed to update.Please try again.');
      console.log(err);
    });
  }

  allFilesToUpload(event, index) {

    this.images[index] =  event.target.files[0];
    this.file.push(<File>event.target.files);


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


}
