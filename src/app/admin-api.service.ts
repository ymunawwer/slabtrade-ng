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

    return this.http.get(ENV.admin + '/customer/count',{headers:{'Auth':'Bearer ' + token,'role':'admin'}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }

  getOrdes():Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/order/getallorder',{headers:{'Auth':'Bearer ' + token,'role':'admin'}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }

  getUser():Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/confirmuser/list',{headers:{'Auth':'Bearer ' + token,'role':'admin'}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }

//pending
  getPort():Observable<any>{
    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/order/getallorder',{headers:{'Auth':'Bearer ' + token,'role':'admin'}}).pipe(
      catchError(err=>this.handleError(err))

    );
  }
  updatePort():Observable<any>{

    let token = this.auth.getToken();

    return this.http.get(ENV.admin + '/order/getallorder',{headers:{'Auth':'Bearer ' + token,'role':'admin'}}).pipe(
      catchError(err=>this.handleError(err))

    );



  }







}
