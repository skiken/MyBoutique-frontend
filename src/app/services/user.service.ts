import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/customer';
  constructor(private http: HttpClient) { }


  getCustomer(username: String): Observable<any>{
    return this.http.get(`${this.baseUrl}/username/${username}`);
  }
  getCustomerByOrderId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/idOrder/${id}`);
  }
  updateCustomer(username: String, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/username/${username}`,value);
  }

  getAllCustomerByRole(role: String): Observable<any>{
    return this.http.get(`${this.baseUrl}/role/${role}`);
  }

  getById(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }



}
