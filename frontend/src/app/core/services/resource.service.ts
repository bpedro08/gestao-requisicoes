import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getActive() {
    return this.http.get<any[]>(`${this.apiUrl}/resources`);
  }

getAll(filters: any = {}) {
  const params = new HttpParams();
  let p = params;
  if (filters.type)      p = p.set('type', filters.type);
  if (filters.is_active !== undefined) p = p.set('is_active', filters.is_active);
  return this.http.get<any[]>(`${this.apiUrl}/resources/all`, { params: p });
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