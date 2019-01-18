import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.sass']
})
export class SupplierDetailsComponent implements OnInit {
  loading = false;
  supplier_arr:any;
  cancel_status;
  type;
  alias;
  first_name;
  last_name;
  email;
  cell_phone;
  home_phone;
  address;
  city;
  state;
  country;
  zip_code;
  isClicked;
  desc;
  constructor(private adminApi:AdminApiService) {
    this.supplier_arr = [];
    this.isClicked = false;
    this.getSupplier();
  }

  ngOnInit() {
  }
  getSupplier(){
    var arr = []
    this.loading = true;
    this.adminApi.getUser().subscribe((res)=>{
      // console.log(res)
      if(Array.isArray(res)){
      res.forEach(element => {
        if(element['roles'][0]==='supplier'){
          this.supplier_arr.push(element)

        }
      });
    }
      this.loading = false;
    })

  }

  onCustomerdetail(data){
    console.log(data)
    this.type = "Inventory"
    this.isClicked = true;
    this.cancel_status = 'Verified'
    this.type = data['account_type']
    this.alias = data['alias']
    this.first_name= data['first_name']
    this.last_name= data['last_name']
    this.email= data['email']
    this.cell_phone= data['cell_phone']
    this.home_phone = data['home_phone']
    this.address = data['address']
    this.city = data['city']
    this.state = data['country']
    this.country = data['state']
    this.zip_code = data['zip_code']
    this.desc = data['desc']
  }


  onStatusUpdate(){
    console.log(this.cancel_status)

    if(this.cancel_status==='Verified'){
    this.adminApi.onUserApproval(this.email).subscribe((res)=>{
      Swal({
        text: 'Succesfully Approved',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    },(err)=>{
      Swal({
        text: 'please try again',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })
  } else if(this.cancel_status==='Not Verified'){
    this.adminApi.onRegisterUserCancel(this.email).subscribe((res)=>{
      Swal({
        text: 'Succesfully Removed',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });


    },(err)=>{
      Swal({
        text: 'please try again',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
    })

  }else {
    Swal({
      text: 'Invalid Option',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });  }


  }

  onTypeUpdate(){
    console.log(this.type)
    this.adminApi.onTypeUpdate(this.email,this.type).subscribe((res)=>{
      console.log(res)
      Swal({
        text: 'Succesfully Updated',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    },(err)=>{
      Swal({
        text: 'Please try again',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })


  }


  onDelete(data){
    let email = data['email'];
    this.adminApi.onRegisterUserCancel(email).subscribe((res)=>{
      Swal({
        text: 'Supplier deleted succesfully.',
        type: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });
      window.location.reload();
    },(err)=>{
      Swal({
        text: 'Please try again',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })

  }



}
