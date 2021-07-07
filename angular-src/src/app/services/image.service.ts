import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  userId: number | undefined = undefined
  authToken: string | null = null

  constructor(private http: HttpClient) {}

  initializeService() {
    let userData = localStorage.getItem('user');
    this.userId = userData ? JSON.parse(userData).id : undefined;
    this.authToken = localStorage.getItem('id_token')
  }

  deleteImage(id:number) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`http://localhost:4100/images/delete/${id}`, { headers: headers })
  }

  getImagesByUser(userId:number) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`http://localhost:4100/images/all/${this.userId}`, { headers: headers })
  }

  postImage(imageInfo:any) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    imageInfo.userId = this.userId
    return this.http.post('http://localhost:4100/images/create', imageInfo, { headers: headers })
  }

  postImageData(imageData: FormData) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:4100/images/createImageData', imageData, { headers: headers })
  }
}
