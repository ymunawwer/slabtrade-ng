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
// /order/shippingdownload?id=
getShippingDoc(id){
  let token = this.auth.getToken();

  return this.http.get(ENV.admin + '/order/shippingdownload?id='+id,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );

}

uploadWiredDoc(id,data):Observable<any>{
  let token = this.auth.getToken();
  const headers = new HttpHeaders();


        headers.append('Auth','Bearer ' + token);
  return this.http.post(ENV.admin+'/order/uploadshippingdetail?id='+id,data,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}})
}

statusPaymentUpdate(id,status,payment){
  let token = this.auth.getToken();

  return this.http.get(ENV.admin + '/order/paymentstatusupdate?id='+id+"&status="+status+"&payment="+payment,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );
}




uploadPurchaseOrder(data){
  let token = this.auth.getToken();
  console.log(token)
  const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/pdf');
        headers.append('auth','Bearer ' + token);
        headers.append('role',this.auth.getUser().roles[0]);
        // data['supplier_id']= this.auth.getUser()._id;
  console.log('api',data)
  return this.http.post(ENV.admin +'/order/uploadpurchaseorder',data,{headers:headers});

}

// /order/uploadshippingdetail?id=


getSalesReport(data) {
  const token = this.auth.getToken();
  // tslint:disable-next-line:max-line-length
  return this.http.get(ENV.admin + '/report/salesreport?type=' + data.type + '&start=' + data.startDate + '&end=' + data.endDate + '&status=' + data.status + '&port=' + data.region,
  {headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))
  );
}


createDeal(data) {

  const token = this.auth.getToken();

  const headers = new HttpHeaders();

  const inputData = {

    'product_type': data.product_type,
    'offer_value': data.offer_value,
    'start_date': data.start_date,
    'end_date': data.end_date
  };

  headers.append('Auth','Bearer ' + token);
  return this.http.post(ENV.admin + '/deals/createdeal', inputData,
  {headers: {'Auth': 'Bearer ' + token, 'role': this.auth.getUser().roles[0]}});

}





}
