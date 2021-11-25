import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/Order';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderItemService } from 'src/app/services/order-item.service';
import { OrderService } from 'src/app/services/order.service';
import { PdfService } from 'src/app/services/pdf.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  showUsers=true;
  usersList:Customer[];
  customer:Customer=new Customer();
  orderList:Order[]=[];
  product:Product=new Product();
  productList:Product[]=[];
  blob:any;
  emtyList:Boolean=false;
  constructor(
    private userService : UserService,
    private cartService:CartService,
    private orderService:OrderService,
    private productService:ProductService,
    private orderItemService:OrderItemService,
    private tokenStorage:TokenStorageService,
    private router:Router,
    private datepipe: DatePipe,
    private  pdfService:PdfService,
    private cookiesservice:CookieService,
  ) {
    if (!this.tokenStorage.getUser()) {
      this.router.navigate(['/home']);
  }
   }

  ngOnInit(): void {
    this.getAllProduct(); 
    this.gelUserOrders();
  }
  getOtderItems(idOrder :any){
    this.orderItemService.getOrderItemByOrder(idOrder).subscribe(
      
    )
  }

 getAllProduct(){
   this.productService.getAllProducts().subscribe(
   productList=>this.productList=productList
   )}




 gelUserOrders() {
  
   this.orderList=[];
   this.userService.getCustomer(localStorage.getItem("username")).subscribe(
       data=>{
        var customer:Customer=data as Customer;
        this.cartService.getByCustomerIdAndStatusConfirmed(customer.id).subscribe(
        data=>{
        var cart:Cart[]=data as Cart[];
        console.log(cart)
        if(cart.length==0){this.emtyList=true;}
        for(var i=0;i<cart.length;i++){
        this.orderService.getOrderById(cart[i].orderId).subscribe(
        data=> {
         var order=data as Order;
         this.orderItemService.getOrderItemByOrder(order.id).subscribe(
           data=>{
             var orderItems:OrderItem[]=data as OrderItem[];
             order.orderItems=orderItems;
             this.orderList.push(order)
           })
         })}}
         )}
        )}
      
     

convert(date:Date){
return  this.datepipe.transform(date, 'yyyy/MM/dd')
}


getpdf(orderId:any){
 this.pdfService.getPdf(orderId).subscribe(
   data=>{
     this.blob = new Blob([data], {type: 'application/pdf'});

     var downloadURL = window.URL.createObjectURL(data);
     var link = document.createElement('a');
     link.href = downloadURL;
     link.download = "Facture_"+orderId+".pdf";
     link.click();
   }
 )
}

getProductName(id:any){
  for(var i=0;i<this.productList.length;i++){
    if(this.productList[i].id==id){
      return this.productList[i].name;
    }}
   }

   getProductPrice(id:any){
    for(var i=0;i<this.productList.length;i++){
      if(this.productList[i].id==id){
        return this.productList[i].price;
      }}
     }

     getProductImage(id:any){
      for(var i=0;i<this.productList.length;i++){
        if(this.productList[i].id==id){
          return this.productList[i].imgPath;
        }}
       }


    getOrderStatus(status:any){
      if(status=="CONFIRMED")
      return "commande comfirmée"
      if(status=="IN_DELIVERING")
      return "commande en cours de livraison"
      if(status=="LIVRED")
      return "commande livrée"

       }

}
