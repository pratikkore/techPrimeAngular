import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

  readonly URL = 'http://localhost:8000/protected';
  constructor(private htttp: HttpClient) {}

  getReasonData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/reason/reasonList', httpOptions);
  }

  getTypeData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/type/typeList', httpOptions);
  }

  getDivisionData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/division/divisionlist', httpOptions);
  }

  getCategoryData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/category/categorylist', httpOptions);
  }

  getPriorityData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/priority/priorityList', httpOptions);
  }

  getDeptData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/dept/deptlist', httpOptions);
  }

  getLocationData() {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.get(this.URL + '/location/locationlist', httpOptions);
  }

  saveProjectData(data:any){
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.htttp.post(this.URL + '/project/save',data, httpOptions);
  }
}
