import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';
  constructor(private http: HttpClient) { }

  updateOrder(id:number,order:any):Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`,order);
  }

  getOrderById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllConfirmedOrders():Observable<any>{
    return this.http.get(`${this.baseUrl}/confirmed`);
  }
  getAllOrdersInDelivery():Observable<any>{
    return this.http.get(`${this.baseUrl}/inDelivery`);
  }
  inDelivery

  deleteOrder(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }




}
