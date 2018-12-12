import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule,NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  err:boolean;
  
  constructor(private auth:AuthService) { 
   this.err  = true;
   
  }

  ngOnInit() {
  }
  @ViewChild('f') myForm;
  ngAfterViewInit(){
    this.myForm.valueChanges.subscribe(data =>{
      console.log('Form changes', data);
      this.err = true

    })
  }



  onSubmit(form:NgForm){
    if(!form.invalid){
    let login_data = {'email':form.value.email,'password':form.value.password}
    this.auth.doLogin(login_data).subscribe((res)=>{

      localStorage.setItem('currentUser',JSON.stringify(res));
      console.log(JSON.stringify(res))
    },(error)=>{
      this.err = false;
    })
    // console.log('form')
  }
}

}
