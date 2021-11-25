import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

private baseUrl = 'http://localhost:8080/api/pdfApi';
  constructor(private http: HttpClient) { }

  getPdf(idOrder:number):Observable<Blob>{
    let uri = `${this.baseUrl}/export/pdf/${idOrder}`;
    return this.http.get(uri, { responseType: 'blob' });
}
  }


