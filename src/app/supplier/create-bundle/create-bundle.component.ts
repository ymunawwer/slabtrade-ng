import { Component,Renderer ,OnInit,Renderer2 } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { AuthService } from '../../auth.service';
import {NodeapiService} from '../../nodeapi.service'
import { Router } from '@angular/router'
declare var $:any;
declare var feather:any;
@Component({
  selector: 'app-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.sass']
})
export class CreateBundleComponent implements OnInit {
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
    'product_description':'',
    'bundle_description':'',
    'inspection_report':''



 }

new_color = {
  'name':'',
  'code':''
}

  constructor(private ren:Renderer,private renderer: Renderer2,private auth:AuthService,private node:NodeapiService,private route:Router) {
    this.unit = "cm";
    this.dimension = [];
    this.isdimensionsave = false;
    this.aray=[];
    this.bundle.supplier_id = this.auth.getUser()._id;
    this.file =[];
   }

  ngOnInit() {
    feather.replace();
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


  }
  createRange(number) {
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
      //  console.log(i);
       this.aray.push(new Object())
    }
    return items;
  }

  allFilesToUpload(event){


    // document.getElementById('inputGroupFile07_label').innerText = event.target.files[0]['name'];

    this.file.push(<File>event.target.files)


  }



  onCreateBundle(){
    this.bundle.thickness = this.thickness_new
    this.bundle.dimension[0].thickness = this.thickness_new;
    this.bundle.unit = <string>this.unit;
    const formData:any = new FormData();
    const file: Array<File> = this.file;
    for (let [key, value] of Object.entries(this.bundle)) {
      if(key==="dimension"){
        // alert(JSON.stringify(value))
        formData.append(key,JSON.stringify(value))

      }
      else if(key!=="dimension"){
      formData.append(key,value)
      }
    }

    // formData.append("bundle_data",this.bundle)
    for(let i =0; i < file.length; i++){

      formData.append("image", file[i][0], file[i][0]['name']);
  }

    // console.log("bundle",this.bundle)
    this.node.createBundle(formData).subscribe((res)=>{
      // console.log("success")
      alert("Success");
      this.route.navigate(['/supplier/products'])
    },(err)=>{
      alert("Please try again.")
    })
  }


  onProductDescriptionChange(ev) {
    try {
      this.bundle.product_description = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }


  onBundleDescriptionChange(ev) {
    try {
      this.bundle.bundle_description = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

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
  @ViewChild('close') close;
  onDimensionSave(form:NgForm){
    this.dimension = []
    let x = form.value





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
    this.bundle.net_weight = (this.bundle.net_area*this.thickness_new) / 166;
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
