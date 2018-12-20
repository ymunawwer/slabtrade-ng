import { Component, OnInit } from '@angular/core';
import {NodeapiService} from '../../nodeapi.service'
import saveAs from 'file-saver';
import {saveAs as importedSaveAs} from "file-saver";
import { AuthService } from '../../auth.service';

declare var feather:any;
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass']
})
export class AllProductsComponent implements OnInit {
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
     'net_area':0.0,
     'net_weight':0.0,
     'product_description':'',
     'bundle_description':'',
     'inspection_report':''
 
 
 
  }
  
  constructor(private node:NodeapiService,private auth:AuthService) { 
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

  ngOnInit() {
    feather.replace();
    this.node.getProduct().subscribe((result)=>{
      this.product = result;
      
    })
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
  this.node.downloadFile().subscribe(blob => {
    importedSaveAs(blob, "prod.csv");
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
      alert("Uploaded Succesfully");
    },(err)=>{
      alert("please try again later.");
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
    
    console.log(product)

    this.bundle['product_name'] = product['product_name']
    
    this.bundle['supplier_id']= product['supplier_id']
    this.bundle['product_type']= product['product_type']
    this.bundle['product_type_code']= product['product_type_code']
    this.bundle['quality']= product['quality']
    this.bundle['no_of_slabs']= product['no_of_slabs']
    this.bundle['price']= product['price']
    this.bundle['color']= product['coloe']
    this.bundle['dimension']= product['dimension']
    this.bundle['width']= product['net_dimension'][0]['width']
    this.bundle['height']= product['net_dimension'][0]['height']
    this.bundle['thickness']= product['dimension'][0]['thisckness']
    this.bundle['unit']= product['net_dimension']['unit']
    this.bundle['weight']= product['net_weight']
    this.bundle['bundle_number']= product['bundle_number']
    this.bundle['slab_weight']= product['slab_weight']
    this.bundle['net_area']= product['net_area']
    this.bundle['net_weight']= product['net_weight']
    this.bundle['product_description']= product['product_description']
    this.bundle['bundle_description']= product['Bundle_description']
    this.bundle['inspection_report']= product['inspection_report']
    
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
    this.node.updateProduct(this.bundle).subscribe((update_result)=>{

      console.log(update_result)

    },(err)=>{
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





  
}
