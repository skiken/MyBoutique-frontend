import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class DataService {
  productsId: String=localStorage.getItem("products");
  listSelectedProductsId:number[]=this.productsId!==null? JSON.parse(localStorage.getItem("products")) :[];
  private productNumber= new BehaviorSubject(this.listSelectedProductsId.length);
  currentProductNumber = this.productNumber.asObservable();

  constructor( ) { }

  addProduct(i:number) {
    this.productNumber.next(i);
  }
}
