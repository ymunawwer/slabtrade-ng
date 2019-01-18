import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.sass']
})
export class CustomerDetailsComponent implements OnInit {
  loading = false;
  customers_arr;
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
    this.isClicked = false;
    this.customers_arr = []
    this.cancel_status = 'Verified'
    this.type =''
    this.alias = ''
    this.first_name= ''
    this.last_name= ''
    this.email= ''
    this.cell_phone= ''
    this.home_phone = ''
    this.address = ''
    this.city = ''
    this.state = ''
    this.country = ''
    this.zip_code = ''
    this.desc = ''
    this.getCustomers();

  }

  ngOnInit() {
  }

  getCustomers(){
    var arr = []

    this.loading = true;
    this.adminApi.getUser().subscribe((res)=>{
      console.log(res)
      if(Array.isArray(res)){
      res.forEach(element => {
        if(element['roles'][0]==='customer'){
          this.customers_arr.push(element)

        }
      });
    }

    this.loading = false;


    })

  }
  onCustomerdetail(data){
    this.isClicked = true;
    this.cancel_status = 'Verified'
    this.type = data['account_type']
    this.alias = data['alias']
    this.first_name= data['first_name']
    this.last_name= data['last_name']
    this.email= data['email']
    this.cell_phone= data['cell_phone']
    this.home_phone = data['home_phone']
    this.address = data['mailing_address']
    this.city = data['mailing_city']
    this.state = data['mailing_country']
    this.country = data['mailing_state']
    this.zip_code = data['mailing_zip']
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
        text: 'Please try again',
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
        text: 'Please try again',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })

  }else {
    Swal({
      text: 'Invalid option',
      type: 'error',
      confirmButtonText: 'ok',
      confirmButtonColor: '#0a3163'
    });
  }


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
        text: 'Please try again later.',
        type: 'error',
        confirmButtonText: 'ok',
        confirmButtonColor: '#0a3163'
      });

    })

  }

}
