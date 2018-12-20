import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service'
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.sass']
})
export class RegisterCustomerComponent implements OnInit {

  constructor(private auth:AuthService) { }

  @ViewChild('f') formRef;

  ngOnInit() {
  }


  ngAfterViewInit(){
    this.formRef.valueChanges.subscribe(data =>{
      console.log('Form changes', data);
      

    })
  }



  onSubmit(form:NgForm){
    var d = new Date();
    var n = d.getMonth();
    
    // console.log(form)
    let alias = 'CUS'+'-'+n+'-'+d.getTime();
    console.log(alias)
    var data = {'alias':alias,'data':form.value}
    this.auth.doSupplierRegister(data).subscribe((res)=>{
      console.log(res)
    })


  }

}
