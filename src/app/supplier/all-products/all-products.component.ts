import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
import saveAs from 'file-saver';
import {saveAs as importedSaveAs} from "file-saver";
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare var $:any;
declare var feather:any;
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass']
})
export class AllProductsComponent implements OnInit {
  loading = false;
  product:any;
  isBulk:boolean;
  supplier_id:String;
  file:any;
  step1:boolean;
  isProductList:boolean;
  isUpdate_step2:boolean;
  isUpdate_step3:boolean;
  isUpdate_step4:boolean;

  isUpdate:boolean;

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
     'bundle_description':'',
     'inspection_report':''



  }

  constructor(private node:NodeapiService,private auth:AuthService,private router:Router,private _sanitizer:DomSanitizer) {
    feather.replace();
    this.product = [];
    this.step1=false;
    this.isUpdate = false;
    this.isUpdate_step2 = false;
    this.isUpdate_step3 = false;
    this.isUpdate_step4=false;
    this.isBulk = false;
    this.isProductList = true;
    this.supplier_id = this.auth.getUser()._id;
    this.file = []

  }


  // 9842597143 ramnetaji

  ngOnInit() {
    feather.replace();
    this.loading = true;
    this.node.getProduct().subscribe((result)=>{
      console.log(result)
      this.product = result;

    this.loading = false;


    })


    $('#smartwizard3').smartWizard({
      selected: 0, // Initial selected step, 0 = first step
      keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
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
  }
  onBulk(){
    this.isBulk = true;
    this.isProductList = false;
    this.isUpdate = false;
    this.isUpdate_step2 = false;
    this.isUpdate_step3 = false;
    this.isUpdate_step4=false;
  }
  downloadCSV(){
  //   this.node.downloadProductCsv().subscribe(res => {
  //     console.log(res)
  //     res.toBlob(function(blob){
  //       alert("demo")
  //       saveAs(blob, "product.csv");
  //     })

  // })
  this.loading = true;

  this.node.downloadFile().subscribe(blob => {
    importedSaveAs(blob, "prod.csv");
    this.loading = false;

})

  }


  csvToUpload(event){


      // document.getElementById('inputGroupFile07_label').innerText = event.target.files[0]['name'];
      event.target.labels[0].innerText = event.target.files[0]['name'];
      this.file.push(<File>event.target.files)


    }
  csvUpload(){
    const formData:any = new FormData();
    const file: Array<File> = this.file;

    formData.append("supplier_id",this.supplier_id)
    for(let i =0; i < file.length; i++){

      formData.append("product_csv", file[i][0], file[i][0]['name']);
  }




    this.node.uploadProductCsv(formData).subscribe((result)=>{

      Swal({
        text: 'Uploaded Succesfully',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    },(err)=>{

      Swal({
        text: 'please try again later.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })
  }


 editProduct(product){

  this.isBulk = false;
  this.isProductList = false;
  this.isUpdate = true;
  this.isUpdate_step2 = false;
  this.isUpdate_step3 = false;
  this.isUpdate_step4=false;
  this.step1=false;

    // console.log(product['net_dimension'][0]['width'])
    this.bundle = product;
    this.bundle.net_area = this.bundle['dimension'][0]['width']*this.bundle['dimension'][0]['height']
    // this.bundle['product_name'] = product['product_name']

    // this.bundle['supplier_id']= product['supplier_id']
    // this.bundle['product_type']= product['product_type']
    // this.bundle['product_type_code']= product['product_type_code']
    // this.bundle['quality']= product['quality']
    // this.bundle['no_of_slabs']= product['no_of_slabs']
    // this.bundle['price']= product['price']
    // this.bundle['color']= product['color']
    // this.bundle['dimension']= product['dimension']
    // this.bundle['width']= product['net_dimension'][0]['width']
    // this.bundle['height']= product['net_dimension'][0]['height']
    // this.bundle['thickness']= product['dimension'][0]['thisckness']
    // this.bundle['unit']= product['net_dimension']['unit']
    // this.bundle['weight']= product['net_weight']
    // this.bundle['bundle_number']= product['bundle_number']
    // this.bundle['slab_weight']= product['slab_weight']
    // this.bundle['net_area']= product['net_area']
    // this.bundle['net_weight']= product['net_weight']
    // this.bundle['product_description']= product['product_description']
    // this.bundle['bundle_description']= product['Bundle_description']
    // this.bundle['inspection_report']= product['inspection_report']


    console.log("demo",this.bundle)

  }

  updateStep2(){
    this.isBulk = false;
    this.isProductList = false;
    this.isUpdate = false;
    this.isUpdate_step2 = true;
    this.isUpdate_step3 = false;
    this.isUpdate_step4=false;
    this.step1=false;
  }

  updateStep3(){
    this.isBulk = false;
    this.isProductList = false;
    this.isUpdate = false;
    this.isUpdate_step2 = false;
    this.isUpdate_step3 = true;
    this.isUpdate_step4=false;
    this.step1=false;
  }

  updateStep4(){
    this.isBulk = false;
    this.isProductList = false;
    this.isUpdate = false;
    this.isUpdate_step2 = false;
    this.isUpdate_step3 = false;
    this.isUpdate_step4=true;
    this.step1=false;
  }

  onUpdate(){
    this.bundle['net_weight'] = (this.bundle['dimension'][0]['width']*this.bundle['dimension'][0]['height']*this.bundle['dimension'][0]['thickness'])/166;
    this.node.updateProduct(this.bundle).subscribe((update_result)=>{
      Swal({
        text: 'Bundle updated.',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      window.location.reload();
      console.log(update_result)


    },(err)=>{

      Swal({
        text: 'Error occured while updating',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      console.log(err)
    })
  }



  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      //  items.push(i);
       console.log(i);
// /this.aray.push(new Object())
    }
    return items;
  }


  onProductDescriptionChange(ev) {
    try {

      this.bundle.product_description = ev.target.value;
      console.log(this.bundle.product_description);
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


  get inspectionReport () {
    return this.bundle.inspection_report
  }

  get bundleDescription () {
    return this.bundle['Bundle_description']
  }

  get productDescription () {
    return this.bundle.product_description
  }

  set inspectionReport (v) {
    try{
      this.bundle.inspection_report = v;}
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

  set bundleDescription (v) {
    try{console.log(v)
      this.bundle.bundle_description = v;}
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

  set productDescription (v) {
    try{
      console.log(v)
      this.bundle.product_description = v;
    console.log(this.bundle.product_description)}
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }


  getBackground(image) {

    // image = image.replace('home/gamasome/slabtrade/public/','');
    if(image){
      return this._sanitizer.bypassSecurityTrustStyle(`url(${image.path})`);
    }else{
      return null;
    }

}




}
