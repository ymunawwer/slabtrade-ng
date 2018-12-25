import { Injectable } from '@angular/core';
import { AuthService } from '../app/auth.service';
import { HttpClient,HttpErrorResponse,HttpParams, HttpHeaders, } from '@angular/common/http';
import {RequestOptions,Headers,Http,ResponseContentType} from '@angular/http';
import { Observable,throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators';
import {ENV } from './core/env.config';
@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http:HttpClient,private auth:AuthService,private htp:Http) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      alert(error.message);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  getCount():Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/customer/count',{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }

  getOrdes():Observable<any>{
    

  let token = this.auth.getToken();


    return this.http.get(ENV.admin + '/order/getallorder',{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}})

    
  }

  getUser():Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/confirmuser/list',{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }

//pending
  getPort():Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/order/getallorder',{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }
  updatePort(data):Observable<any>{

    let token = this.auth.getToken();

    return this.http.post(ENV.admin +  '/port/updatePort',data,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}})
   



  }

  addPort(data):Observable<any>{
    let token = this.auth.getToken();

    return this.http.post(ENV.admin + '/port/add',data,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}})

 


  }


  removePort(id):Observable<any>{
    let token = this.auth.getToken();
    let data = {
      "port_id":id
    }

    return this.http.post(ENV.admin + '/port/remove',data,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}})

 


  }

  // /order/orderstatus

  updateStatus(id,status):Observable<any>{
    let token = this.auth.getToken();
    let data = {
      '_id':id,
      'status':status
    }
    return this.http.post(ENV.admin + '/order/orderstatus',data,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}} )

  }

  getPortByCountry(country):Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/port/getportbycountry?country='+country,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }

// getproductdetail
getProductDetail(bundel_number):Observable<any>{

  let token = this.auth.getToken();

  return this.http.get(ENV.admin + '/user/getproductdetail?bundle_number='+bundel_number,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );



}

onUserApproval(email){
  let token = this.auth.getToken();

  return this.http.get(ENV.admin + '/confirmuser/approve?id='+email,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );


}

onRegisterUserCancel(email){
  let token = this.auth.getToken();

  return this.http.get(ENV.admin + '/confirmuser/reject?id='+email,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );


}

onTypeUpdate(email,type){

  let token = this.auth.getToken();

  return this.http.get(ENV.admin + '/confirmuser/typeupdate?id='+email+'&type='+type,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );

}








}
