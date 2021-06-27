import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  userId: number | undefined = undefined
  authToken: string | null = null

  constructor(private http: HttpClient) {}

  initializeService() {
    let userData = localStorage.getItem('user');
    this.userId = userData ? JSON.parse(userData).id : undefined;
    this.authToken = localStorage.getItem('id_token')
  }

  getJobsByUser(userId: number) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`http://localhost:4100/jobs/all/${this.userId}`, { headers: headers })
  }

  postJob(job: any) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    job.userId = this.userId
    return this.http.post('http://localhost:4100/jobs/create', job, { headers: headers })
  }
}
