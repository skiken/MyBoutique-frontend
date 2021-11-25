import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private baseUrl = 'http://localhost:8080/api/payment';
  constructor(private http:HttpClient) { }

  updatePayment(id:number,payment:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,payment);
  }

  createPayment(payment:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/create`,payment);
  }

  getPaymentById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
