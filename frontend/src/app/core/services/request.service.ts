import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.apiUrl}/requests`);
  }

  create(data: any) {
    return this.http.post<any>(`${this.apiUrl}/requests`, data);
  }

  cancel(id: number) {
    return this.http.patch<any>(`${this.apiUrl}/requests/${id}/cancel`, {});
  }

  approve(id: number, adminNotes: string) {
    return this.http.patch<any>(`${this.apiUrl}/requests/${id}/approve`, {
      admin_notes: adminNotes
    });
  }

  reject(id: number, adminNotes: string) {
    return this.http.patch<any>(`${this.apiUrl}/requests/${id}/reject`, {
      admin_notes: adminNotes
    });
  }
}