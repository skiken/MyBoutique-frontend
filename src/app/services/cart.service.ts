import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private baseUrl = 'http://localhost:8080/api/carts';
  constructor(private http: HttpClient) { }

  createCart(customerId):Observable<any>{
    return this.http.post(`${this.baseUrl}`,customerId);  
  }

  getById(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getAllCarts(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  getByOrderId(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/orderId/${id}`);
  }

  getByCustomerIdAndStatusConfirmed(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/customerId/StatusConfirmed/${id}`);
  }
  getByCustomerIdAndStatusNew(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/customerId/StatusNew/${id}`);
  }
  
  updateCart(cartId:any):Observable<any>{
    return this.http.put(`${this.baseUrl}`,cartId);  
  }

  deleteCart(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }





}
