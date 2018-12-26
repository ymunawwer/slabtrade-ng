import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service'
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.sass']
})
export class SupplierRegisterComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

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
    let alias = 'SUP'+'-'+n+'-'+d.getTime();
    console.log(alias)
    var data = {'alias':alias,'data':form.value}
    this.auth.doSupplierRegister(data).subscribe((res)=>{
      console.log(res)
      if(res['error_code']===200){
        if(res['message']==='Supplier register Succesfully'){
          alert('Thank you for registering with us.');
          this.router.navigate(['/login']);

        }else{
          alert("Email or cell phone already register please try with different.")
        }
        }else if(res['error_code']===500){
          alert("Please try with different email or try after some time.")

        }
    },(err)=>{
      alert("Please try with different email or try after some time.")
    })


  }
}
