import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  constructor(private http: HttpClient) { }

  getAllProductsByCategory(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/categoryId/${id}`);
  }

  getAllProducts(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  getProductById(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/productId/${id}`);
  }

  createProduct(produit:any): Observable<any>{
    return this.http.post(`${this.baseUrl}`,produit);
  }

  updateProduct(id:any,produit:any): Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,produit);
  }

  deleteProduct(id:any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`,);
  }


}
