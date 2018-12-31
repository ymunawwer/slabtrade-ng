import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpParams, HttpHeaders, } from '@angular/common/http';
import {RequestOptions,Headers,Http,ResponseContentType} from '@angular/http';
import { Observable,throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {ENV } from './core/env.config';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {

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


  fetchHomePageWithPrice():Observable<any>{
    this.auth.getToken();
    let token = this.auth.getToken();
    // let headers = new HttpHeaders();
    // headers.set('Auth','Bearer ' + token);
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    // let headers = { params: new HttpParams() };
    // let token = this.auth.getToken()
    // console.log('token',this.auth.getToken())
    // headers.params.set('Auth','Bearer ' + token)

        // let options = new RequestOptions({ headers : headers });

    return this.http.get(ENV.customer+'/firstpageproductlistwithprice',{headers:{'Auth':'Bearer ' + token}});
    // .pipe(
    //   catchError(err=>this.handleError(err))

    // );
  }

  fetchHomePage():Observable<any>{
    this.auth.getToken();
    return this.http.get(ENV.customer+'/firstpageproductlist').pipe(
      catchError(err=>this.handleError(err))

    );
  }


  searchByType(type,page):Observable<any>{
    return this.http.get(ENV.customer+'/searchproduct?id='+type+'&type=producttype&page='+ page).pipe(
      catchError(err=>this.handleError(err))

    );

  }

  searchByColor(color,page):Observable<any>{
    return this.http.get(ENV.customer+'/searchproduct?id='+color+'&type=color&page='+ page).pipe(
      catchError(err=>this.handleError(err))

    );

  }

  searchByTypeWithPrice(type,page):Observable<any>{
    let token = this.auth.getToken();
    return this.http.get(ENV.customer+'/searchproductwithprice?id='+type+'&type=producttype&page='+ page,{headers:{'Auth':'Bearer ' + token}});



  }

  searchByColorWithPrice(color,page):Observable<any>{
    let token = this.auth.getToken();
    return this.http.get(ENV.customer+'/searchproductwithprice?id='+color+'&type=color&page='+ page,{headers:{'Auth':'Bearer ' + token}});



  }


  getSimilarProduct(id):Observable<any>{

    return this.http.get(ENV.customer + '/getsimilarproduct?supplier_id='+id+'&limit'+4).pipe(
      catchError(err=>this.handleError(err))

    );


  }


  getProductBySupplier(id):Observable<any>{

    return this.http.get(ENV.customer + '/getsimilarproduct?supplier_id='+id+'&limit='+16).pipe(
      catchError(err=>this.handleError(err))

    );


  }



  addToCart(data):Observable<any>{
    let token = this.auth.getToken();
    return this.http.post(ENV.customer + '/addtocart',data,{headers:{'Auth':'Bearer ' + token}}).pipe(
      catchError(err=>this.handleError(err))

    );

  }

// removecartitem
removeCartItem(bundle):Observable<any>{
  let token = this.auth.getToken();

  return this.http.get(ENV.customer + '/removecartitem?id='+this.auth.getUser()._id+'&bundle='+bundle,{headers:{'Auth':'Bearer ' + token}}).pipe(
    catchError(err=>this.handleError(err))

  );
}

  getCart(page):Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.customer + '/cart?id='+this.auth.getUser()._id+'&page='+page,{headers:{'Auth':'Bearer ' + token}}).pipe(
      catchError(err=>this.handleError(err))

    );

  }


  checkOut(payment,tax,service,total,shipping_addr,port,unload):Observable<any>{
    let token = this.auth.getToken();
    let data = {
      "user_id":this.auth.getUser()._id,
      "name":this.auth.getUser().first_name,
      "payment":payment,
      "tax":tax,
      "service":service,
      "total":total,
      "shipping_addr":shipping_addr,
      "port":port,
      "unload":unload

    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Auth','Bearer ' + token);

    return this.http.post(ENV.customer + '/checkout',data,{headers:headers});



  }

  getPortDetail(port_id):Observable<any>{
    let token = this.auth.getToken();
    return this.http.get(ENV.customer + '/getport?port_id='+port_id,{headers:{'Auth':'Bearer ' + token}})


  }

  // /getportbycountry

  getPortDetailBycountry(country):Observable<any>{
    let token = this.auth.getToken();
    return this.http.get(ENV.customer + '/getportbycountry?country='+country,{headers:{'Auth':'Bearer ' + token}})


  }

  getOrder(){
    let token = this.auth.getToken();
    return this.http.get(ENV.supplier +'/getallorder?id='+this.auth.getUser()._id,{headers:{'Auth':'Bearer ' + token}});

  }

  getOrderByCustomer(id){
    let token = this.auth.getToken();
    return this.http.get(ENV.customer +'/getorder?id='+id,{headers:{'Auth':'Bearer ' + token}});

  }


  getProduct(){
    // http://localhost:3002/supplier/getallproduct?supplier_id=
    let token = this.auth.getToken();
    return this.http.get(ENV.supplier +'/getallproduct?supplier_id='+this.auth.getUser()._id,{headers:{'Auth':'Bearer ' + token}});

  }


  getCustomerName(_id){

    let token = this.auth.getToken();
    return this.http.get(ENV.supplier +'/getcustomer?id='+_id,{headers:{'Auth':'Bearer ' + token}});
  }

  getOrderDetial(id){

    let token = this.auth.getToken();
    return this.http.get(ENV.supplier +'/getorder?id='+id,{headers:{'Auth':'Bearer ' + token}});

  }

// http://localhost:3002/supplier/uploadshippingdetail


uploadShippingDoc(data){
  let token = this.auth.getToken();
  const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        headers.append('Auth','Bearer ' + token);
        // data['supplier_id']= this.auth.getUser()._id;
  console.log('api',data)
  return this.http.post(ENV.supplier +'/uploadshippingdetail',data,{headers:headers});

}





changeOrderStatus(id,status):Observable<any>{
  let token = this.auth.getToken();
  // localhost:3002/admin/order/orderstatus
  let data = {
    '_id':id,
    'status':status
  }
  return this.http.post(ENV.supplier+'/orderstatus',data,{headers:{'Auth':'Bearer ' + token}})
}




uploadProductCsv(data){
  http://localhost:3002/supplier/uploadBulkProduct
  let token = this.auth.getToken();
  const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'text/csv');
        headers.append('Auth','Bearer ' + token);

  return this.http.post(ENV.supplier+'/uploadBulkProduct',data,{headers:headers});
}

downloadFile(): Observable<Blob> {
  let token = this.auth.getToken();
  let headers = new Headers();
  // headers.append('responseType','ResponseContentType'+'.Blob')
  headers.append('Auth','Bearer ' + token)
  let options = new RequestOptions({headers: headers,responseType: ResponseContentType.Blob });

  return this.htp.get(ENV.supplier+'/csvdownload?id='+this.auth.getUser()._id, options)
      .pipe(map(res => res.blob()));

}

downloadWiredDoc(id): Observable<any> {
  let token = this.auth.getToken();
  let headers = new Headers();
  // headers.append('responseType','ResponseContentType'+'.Blob')
  headers.append('Auth','Bearer ' + token)
  let options = new RequestOptions({headers: headers});

  return this.http.get(ENV.supplier+'/downloadwireddoc?id='+id, {headers:{'Auth':'Bearer ' + token}})


}

createBundle(data):Observable<any>{
  let token = this.auth.getToken();
  const headers = new HttpHeaders();


        headers.append('Auth','Bearer ' + token);
  return this.http.post(ENV.supplier+'/upload',data,{headers:headers})
}


getAllOrder():Observable<any>{

let token = this.auth.getToken();
const headers = new HttpHeaders();
headers.append('Auth','Bearer'+token);

return this.http.get(ENV.customer+'/allorder?id='+this.auth.getUser()._id,{headers:{'Auth':'Bearer ' + token}})

}

clearCart():Observable<any>{

  let token = this.auth.getToken();
const headers = new HttpHeaders();
headers.append('Auth','Bearer'+token);

let data = {
  "id":this.auth.getUser()._id
}

return this.http.post(ENV.customer+'/deletecart',data,{headers:{'Auth':'Bearer ' + token}})

}


updateProduct(data):Observable<any>{
  let token = this.auth.getToken();
  const headers = new HttpHeaders();
  headers.append('Auth','Bearer'+token);



  return this.http.post(ENV.supplier+'/update',data,{headers:{'Auth':'Bearer ' + token}})

}

//recalculate
cartRecalculate(data):Observable<any>{
  let token = this.auth.getToken();
  const headers = new HttpHeaders();
  headers.append('Auth','Bearer'+token);



  return this.http.post(ENV.customer+'/recalculate',data,{headers:{'Auth':'Bearer ' + token}})

}



getShippingDoc(id){
  let token = this.auth.getToken();

  return this.http.get(ENV.customer + '/shippingdownload?id='+id,{headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );

}

getProductDetail(id) {
  const token = this.auth.getToken();

  return this.http.get(ENV.supplier + '/editProduct/' + id, {headers:{'Auth':'Bearer ' + token,'role':this.auth.getUser().roles[0]}}).pipe(
    catchError(err=>this.handleError(err))

  );

}



downloadPurchaseOrder(id): Observable<any> {
  let token = this.auth.getToken();
  let headers = new Headers();
  // headers.append('responseType','ResponseContentType'+'.Blob')
  headers.append('Auth','Bearer ' + token)
  headers.append('Content-Type', 'application/json');
  // let options = new RequestOptions({headers: headers });
 
  return this.http.get(ENV.supplier+'/downloadpurchaseorder?id='+id, {headers:{'auth':token}})
      // .pipe(map(res => res.blob()));

}





}
