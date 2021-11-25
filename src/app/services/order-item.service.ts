import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private baseUrl = 'http://localhost:8080/api/orderItems';
  constructor(private http: HttpClient) { }

  createNewOrderItem(value: any):Observable<Object>{
    return this.http.post(`${this.baseUrl}/create/`,value);
  }

  getOrderItemByOrder(id:number){
    return this.http.get(`${this.baseUrl}/idOrder/${id}`);
  }

  updateOrderItem(id:number,value: any):Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`,value);
  }

  deleteOrderItem(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteOrderItemByOrderId(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl}/orderId/${id}`);
  }




}
