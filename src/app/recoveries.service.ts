import { Irecoveries } from './recoveriesStat';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecoveriesService {
 
  private recoverUrl =  'api/statistics/recoveries.json';
  constructor(private http: HttpClient) { }

   getRecoveries(): Observable<Irecoveries[]>{

    return this.http.get<Irecoveries[]>(this.recoverUrl).pipe (
      tap(data => console.log('All:' + JSON.stringify(data))),
      catchError(this.handleError)
     );

   
     
   
  }
  private handleError(err:HttpErrorResponse){
    let errorMessage='';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
