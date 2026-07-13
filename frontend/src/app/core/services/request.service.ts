import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAll(filters: any = {}) {
    let p = new HttpParams();
    if (filters.status) p = p.set('status', filters.status);
    return this.http.get<any[]>(`${this.apiUrl}/requests`, { params: p });
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

  complete(id: number) {
  return this.http.patch<any>(`${this.apiUrl}/requests/${id}/complete`, {});
  }
}