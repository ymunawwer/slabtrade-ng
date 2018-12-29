import { NodeapiService } from './../../nodeapi.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
declare var feather: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {

  file;
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



  };

  productId;
  bundleDescription;
  productDescription;
  inspectionReport;

  constructor(private apiService: NodeapiService, private router: Router, private route: ActivatedRoute) {



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


this.apiService.getProductDetail(this.productId).subscribe(data => {

    if (data['error_code'] === 200) {

      this.bundle = data['data'];
      console.log('product data', this.bundle);
      this.bundle.net_area = this.bundle['dimension'][0]['width'] * this.bundle['dimension'][0]['height'];

      this.bundleDescription = this.bundle['Bundle_description'];
      this.productDescription = this.bundle['product_description'];
      this.inspectionReport = this.bundle['inspection_report'];


    } else {
      alert('Error ocuured');
    }

});


  }

  createRange(number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
    }
    return items;
  }

  onUpdate() {
    this.bundle['net_weight'] =
    (this.bundle['dimension'][0]['width'] * this.bundle['dimension'][0]['height'] * this.bundle['dimension'][0]['thickness']) / 166;
    this.apiService.updateProduct(this.bundle).subscribe((update_result) => {
      alert('Bundle Updated.');
      window.location.reload();
      console.log(update_result);
    }, (err) => {
      alert('Failed to update.Please try again.');
      console.log(err);
    });
  }

  allFilesToUpload(event) {

    console.log('file changed', event.target.files);

    this.file.push(<File>event.target.files);


  }


}
