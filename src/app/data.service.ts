import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendUrl = 'http://localhost:5000/calculate_std';
  private jsonServerUrl = 'http://localhost:3000/calculations';

  constructor(private http: HttpClient) { }

  calculateStd(data: number[]): Observable<any> {
    return this.http.post<any>(this.backendUrl, { data });
  }

  saveCalculation(data: Data): Observable<any> {
    return this.http.post<any>(this.jsonServerUrl, data);
  }

  getCalculations(): Observable<Data[]> {
    return this.http.get<Data[]>(this.jsonServerUrl);
  }
}
