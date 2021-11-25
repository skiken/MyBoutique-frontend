import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  orderItem:OrderItem;
  products:Product[];
  listSelectedPoductId:number[]=[];
  quantity:number;
  idCategory:any; 
  cartActive:Boolean;
  test:boolean=false;
  listprodString:string;
  showErreur: boolean;


 
  constructor(
   
   private productService: ProductService,
   private route: ActivatedRoute,
   private dataService:DataService,
   private userService:UserService,
   private cartService:CartService
   )
    {}

  ngOnInit(): void {
    if(localStorage.getItem("products")){
      this.listSelectedPoductId=JSON.parse(localStorage.getItem("products"));
    } 
    this.dataService.addProduct(this.listSelectedPoductId.length);
    this.idCategory = this.route.snapshot.paramMap.get('idCategory');
    this.getAllProductsByCategory(this.idCategory);
    this.getactiveCart();

  }

  showCartAlert(){
    this.showErreur = true; 
  }
  hideCartAlert(){
    this.showErreur = false; 
  }
  
  getAllProductsByCategory(id){
    this.productService.getAllProductsByCategory(id).subscribe(
      data=>{
        this.products=data as Product[]
      }
    );
  }

  addProductToCart(product: Product){
    localStorage.getItem("products");
    if(localStorage.getItem("products")){
   this.listSelectedPoductId=JSON.parse(localStorage.getItem("products"));
  }
  
  this.listSelectedPoductId.push(product.id);
    localStorage.setItem("products",JSON.stringify(this.listSelectedPoductId));
    this.dataService.addProduct(this.listSelectedPoductId.length);
}

countSelectedProductInCart(productid:number){
  var counter=0;
  for(var i=0;i<this.listSelectedPoductId.length;i++){
    if (this.listSelectedPoductId[i]==productid){
       counter =counter+1;
       }
  }
  return counter;

}



  setLocal(key: string, value: any): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }

  getactiveCart(){
    this.userService.getCustomer(localStorage.getItem("username")).subscribe(
      data=>{
        var customer=data as Customer
            this.cartService.getByCustomerIdAndStatusNew(customer.id).subscribe(
              data=>{
                var cart:Cart[]= data as Cart[];
                localStorage.setItem("activeCart",JSON.stringify(cart[0].id))
              })
          

  })
}
}
