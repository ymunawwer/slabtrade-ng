import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.sass']
})
export class CustomerDetailsComponent implements OnInit {
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
    this.getCustomers();

  }

  ngOnInit() {
  }

  getCustomers(){
    var arr = []
    this.adminApi.getUser().subscribe((res)=>{
      console.log(res)
      if(Array.isArray(res)){
      res.forEach(element => {
        if(element['roles'][0]==='customer'){
          this.customers_arr.push(element)
          
        }
      });
    }
            
      
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
  }


  onStatusUpdate(){
    console.log(this.cancel_status)

    if(this.cancel_status==='Verified'){
    this.adminApi.onUserApproval(this.email).subscribe((res)=>{
      alert('Succesfully Approved');

    },(err)=>{
      alert('Please try again');

    })
  } else if(this.cancel_status==='Not Verified'){
    this.adminApi.onRegisterUserCancel(this.email).subscribe((res)=>{
      alert('Succesfully Removed');

    },(err)=>{
      alert('Please try again');

    })

  }else {
    alert("Invalid option")
  }


  }
  onDelete(data){
    let email = data['email'];
    this.adminApi.onRegisterUserCancel(email).subscribe((res)=>{
      alert("Supplier deleted succesfully.")
      window.location.reload();
    },(err)=>{
      alert('Please try again later.')
      
    })

  }

}
