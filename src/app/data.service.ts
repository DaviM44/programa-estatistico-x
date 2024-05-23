// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendUrl = 'http://localhost:5000/calculate_std';

  constructor(private http: HttpClient) { }

  calculateStd(data: number[]): Observable<any> {
    return this.http.post<any>(this.backendUrl, { data });
  }

  saveCalculation(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/calculations', data);
  }
}
