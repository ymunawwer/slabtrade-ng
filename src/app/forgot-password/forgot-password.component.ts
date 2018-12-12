import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  onReset(f:NgForm){
    let data = {'email':f.value.email}
    this.auth.doReset(data).subscribe((res)=>{
      console.log(res);
    })

  }

}
