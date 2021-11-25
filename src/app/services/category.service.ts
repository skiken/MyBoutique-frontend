import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';
  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  getCategoryById(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  getCategoryByName(name:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }
  createCategory(category:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`,category);
  }

  updateCategory(id:any,category:any): Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,category);
  }

  deleteCategory(id:any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`,);
  }
}
