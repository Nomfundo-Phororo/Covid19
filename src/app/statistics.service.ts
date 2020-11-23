import { IdeathsAndNewCases } from './statistics';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private statsUrl =  'api/statistics/deathsAndNewCases.json';
  
  constructor(private http: HttpClient) { }

   getStats(): Observable<IdeathsAndNewCases[]>{

    return this.http.get<IdeathsAndNewCases[]>(this.statsUrl).pipe (
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
