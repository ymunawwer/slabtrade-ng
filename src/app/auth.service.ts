import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ENV} from './core/env.config';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

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


}
