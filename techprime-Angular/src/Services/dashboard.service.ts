import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly URL = 'http://localhost:8000/protected/project';
  constructor(private htttp: HttpClient) {}

  getChartData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/chart', httpOptions);
  }

  getProjectStatusCount() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/projectStatusCount', httpOptions);
  }
}
