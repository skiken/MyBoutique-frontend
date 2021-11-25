import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OrderItem } from 'src/app/model/orderItem';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/product';
import { DataService } from 'src/app/services/data.service';
import { OrderItemService } from 'src/app/services/order-item.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TSMap } from "typescript-map"
import { OrderService } from 'src/app/services/order.service';
import { Address } from 'src/app/model/address';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/model/customer';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/model/cart';
import { ProductService } from 'src/app/services/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  selectedProductId:number[]=[];
  commandPrice:number=0;
  deliveryPrice:number=0;
  totalPrice:number=0;
  errorMessage=false;
  connected=false;
  empty=false;
  showModal: boolean;
  orderItem:OrderItem=new OrderItem();
  quantity:number;
  outputMap= new Map<Product,number>();
  outputMapId= new Map<number,number>();
  test:boolean=false;
  customer:Customer;
  address:Address=new Address();
  cart:Cart
  
  constructor(
    private router :Router,
    private cookieService: CookieService,
    private tokenStorageService:TokenStorageService,
    private dataService:DataService,
    private itemOrderService: OrderItemService,
    private orderService: OrderService,
    private productService:ProductService,
    private cartService:CartService,
    private datepipe: DatePipe)
    {
      
    }

  ngOnInit() {
    this.createProductQuantityMap();
    this.calculateCommand();
    this. calculateTotalPrice();
  }

  reloadComponent(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


  add(product:Product){
    if(localStorage.getItem("products")){
      this.selectedProductId=JSON.parse(localStorage.getItem("products"));
    } 
      this.selectedProductId.push(product.id)
      localStorage.setItem("products",JSON.stringify(this.selectedProductId));
      this.dataService.addProduct(this.selectedProductId.length);
      this.reloadComponent();
   }
  
  remove(product:Product){
    if(localStorage.getItem("products")){
      this.selectedProductId=JSON.parse(localStorage.getItem("products"));
    } 
    const index = this.selectedProductId.indexOf(product.id);
    this.selectedProductId.splice(index,1);
    localStorage.setItem("products",JSON.stringify(this.selectedProductId));
    this.dataService.addProduct(this.selectedProductId.length);
    this.reloadComponent();
  }
    

  createProductQuantityMap(){
    if(localStorage.getItem("products")){
      this.selectedProductId=JSON.parse(localStorage.getItem("products"));
     
    } 
    this.outputMapId=new Map();
    for(var i=0;i<this.selectedProductId.length;i++){
      var id= this.selectedProductId[i];
      var quantity=0;
      for(var j=0;j<this.selectedProductId.length;j++){
        if (id==this.selectedProductId[j])
        {
          quantity=quantity+1;
        }}
      if(!this.outputMapId.has(this.selectedProductId[i])){
        this.outputMapId.set((this.selectedProductId[i]),quantity)  
      }}
      for(let [key,value]of this.outputMapId){
      this.productService.getProductById(key).subscribe(
        data=>{
          var product:Product=data as Product;
          this.outputMap.set(product,value);
        })
    }
    this.dataService.addProduct(this.selectedProductId.length);
  }

  deleteSelectedProductFromCart(product:Product){
        if(localStorage.getItem("products")){
          this.selectedProductId=JSON.parse(localStorage.getItem("products"));
        }
        var test:number[]=[];
        for(var i=0;i<this.selectedProductId.length;i++){
          if(product.id!=this.selectedProductId[i]){
            test.push(this.selectedProductId[i])
          }}
        this.selectedProductId=test;
        localStorage.setItem("products",JSON.stringify(this.selectedProductId));
        this.dataService.addProduct(this.selectedProductId.length);
        this.reloadComponent();
        this.createProductQuantityMap();


        
  }

  calculateCommand(){
    for(var i=0;i<this.selectedProductId.length;i++){
      this.productService.getProductById(this.selectedProductId[i]).subscribe(
        data=>{
          var product:Product=data as Product;
          this.commandPrice=this.commandPrice+product.price;
        })
    }}

  calculateTotalPrice(){
    this.totalPrice=this.deliveryPrice+this.commandPrice;
    }

  createOrderItems(){
      this.cartService.getById(localStorage.getItem("activeCart")).subscribe(
        data=>{
           var cart=data as Cart
           this.itemOrderService.getOrderItemByOrder(cart.orderId).subscribe(
             data=>{
               var orderItelList:[OrderItem]= data as [OrderItem];
              for(var i=0;i<orderItelList.length;i++){
                this.deleteOrderItem(orderItelList[i].id)
              }
             for(let [key,value] of this.outputMap){
               var orderItem={quantity:value,productId:key.id,orderId:cart.orderId}
                this.itemOrderService.createNewOrderItem(orderItem).subscribe(
                  data=>{ });
                   orderItem=null;
                 }})
         this.updateOrder(cart.orderId);
         this.reloadComponent();
        
        })
    }

  deleteOrderItem(id:number){
      this.itemOrderService.deleteOrderItem(id).subscribe(
        data=>{}
      )}

  updateOrder(id:number){
    var order={totalPrice:this.commandPrice,status:"CREATION"}
    this.orderService.updateOrder(id,order).subscribe(
      data=>{ })}
  

  checkCart(){
      if(this.tokenStorageService.getUser()){
        if(this.selectedProductId.length!=0){
          this.createOrderItems();
          this.router.navigate(['/order']);
        }else
        {this.empty=true;}
      }
      else{
        this.errorMessage=true;
      } 
    }

    showConnectionPopUp()
    {if(!this.tokenStorageService.getUser()){
        this.showModal = true; }
    else{this.connected=true
    }}

    hideConnectionPopUp()
    {this.showModal = false;
   }
  


}
