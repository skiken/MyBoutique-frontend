import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mail } from '../model/Mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  baseUrl:String="http://localhost:8080/api/mailApi"
  constructor(private http:HttpClient) { }

  sendOrderMail(orderId:any,mail:any):Observable<Object>{
    return this.http.post(`${this.baseUrl}/sendingEmail/${orderId}`,mail);
  }
  sendConfirmationMail(orderId:any,mail:any):Observable<Object>{
    return this.http.post(`${this.baseUrl}/sendingConfirmationEmail/${orderId}`,mail);
  }
}
