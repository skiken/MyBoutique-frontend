import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private baseUrl="http://localhost:8080/api/smsApi"
  constructor(private http:HttpClient) { }

  sendSms(sms:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/sms/`,sms);
  }
}
