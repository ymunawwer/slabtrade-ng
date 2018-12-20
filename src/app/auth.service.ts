import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ENV} from './core/env.config';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token;
  constructor(private http:HttpClient) { }

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

  doLogin(data): Observable<any>{
    return this.http.post(ENV.customer+'/login',data)

   

  }

  doReset(data):Observable<any>{
    return this.http.post(ENV.customer+'/reset',data).pipe(
      catchError(err=>this.handleError(err))

    );
  }


  doRegister(data):Observable<any>{
    return this.http.post(ENV.customer+'/register',data).pipe(
      catchError(err=>this.handleError(err))

    );
  }
  doSupplierRegister(data):Observable<any>{
    return this.http.post(ENV.supplier+'/register',data).pipe(
      catchError(err=>this.handleError(err))

    );
  }

  getToken(){
    this.token = sessionStorage.getItem('currentUser');
    if(this.token){
   
   this.token = JSON.parse(this.token);
   
   return this.token.token;
    }
    return false
  }
  getUser(){
    this.token = sessionStorage.getItem('currentUser');
    if(this.token){
    
    this.token = JSON.parse(this.token);
    console.log(this.token.user_detail.user_detail)
    return this.token.user_detail.user_detail;
    }
    return false

  }

  isAuthenticated(){
    this.token = sessionStorage.getItem('currentUser');
    this.token = JSON.parse(this.token);
    console.log(this.token)
    if(this.token){
    return this.token.token != null;
    }else{
      return false;
    }
  }

  logOut(){
    sessionStorage.removeItem('currentUser');

  }


}
