import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {

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


  fetchHomePage():Observable<any>{
    return this.http.get('http://localhost:3002/customer/firstpageproductlist').pipe(
      catchError(err=>this.handleError(err))

    );
  }





}
