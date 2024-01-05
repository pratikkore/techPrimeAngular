import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectListService {
  updateProjectStatus(_id: any, action: string) {
    throw new Error('Method not implemented.');
  }
  readonly URL = 'http://localhost:8000/protected';

  constructor(private http: HttpClient) {}

  getProjectData(sort: string) {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(
      this.URL + '/project/projectList?sortField=' + sort,
      httpOptions
    );
  }

  updateStatus(body: any) {
    const token = localStorage.getItem('Bearer Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.patch(
      this.URL + '/project/updateStatus/' + body.id + '/' + body.status,
      {},
      httpOptions
    );
  }
}
