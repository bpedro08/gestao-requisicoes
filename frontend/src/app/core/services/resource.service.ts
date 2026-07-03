import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getActive() {
    return this.http.get<any[]>(`${this.apiUrl}/resources`);
  }

  getAll() {
    return this.http.get<any[]>(`${this.apiUrl}/resources/all`);
  }

  create(data: any) {
    return this.http.post<any>(`${this.apiUrl}/resources`, data);
  }

  update(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/resources/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/resources/${id}`);
  }
}