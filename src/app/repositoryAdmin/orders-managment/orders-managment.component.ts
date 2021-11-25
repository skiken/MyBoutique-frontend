import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { Mail } from 'src/app/model/Mail';
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
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-orders-managment',
  templateUrl: './orders-managment.component.html',
  styleUrls: ['./orders-managment.component.scss']
})
export class OrdersManagmentComponent implements OnInit {
  usersList:Customer[];
  cartList:Cart[]=[];
  customer:Customer=new Customer();
  cart:Cart=new Cart();
  confirmedOrderList:Order[];
  orderInDeliveryList:Order[];
  product:Product=new Product();
  productList:Product[]=[];
  blob:any;
  showOrders=true;
  showOrdersLivred=false;
  showModal=false;
  showModal2=false;
  orderId:any;
  constructor(
    private userService : UserService,
    private cartService:CartService,
    private orderService:OrderService,
    private productService:ProductService,
    private orderItemService:OrderItemService,
    private tokenStorage:TokenStorageService,
    private router:Router,
    private datepipe: DatePipe,
    private pdfService:PdfService,
    private mailService:MailService,
    ) {
      if (!this.tokenStorage.getUser()) {
        this.router.navigate(['/adminHome']);
    }
     }

  ngOnInit(): void {
    this.getAllProduct(); 
    this.showTable();
    this.getAllCarts();
  }

  showTable(){
    this.getConfirmedOrders();
    this.showOrders=true;
    this.showOrdersLivred=false;
    
    
  }
  showTable2(){
    this.getOrdersInDelivery();
    this.showOrders=false;
    this.showOrdersLivred=true;
    
    
    
  }

  getAllProduct(){
    this.productService.getAllProducts().subscribe(
    productList=>this.productList=productList
    )}

 

  getConfirmedOrders() {
    this.confirmedOrderList=[];
    this.orderService.getAllConfirmedOrders().subscribe(
      data=>{
        var orderList:Order[]=[];
        orderList= data as Order[];
        for(var i=0;i<orderList.length;i++){
          this.setOrderItems(orderList[i])
        }
      })
  }

  getOrdersInDelivery() {
    this.orderInDeliveryList=[];
    this.orderService.getAllOrdersInDelivery().subscribe(
      data=>{
        this.orderInDeliveryList= data as Order[];
      })
  }

   getAllCarts(){
    this.cartService.getAllCarts().subscribe(
    data=>{
      this.cartList=data as Cart[];
    })
  }

  getClientInformation(orderId:any){
    for(var i=0;i<this.cartList.length;i++){
      if(this.cartList[i].orderId==orderId){
        var str:String=  this.cartList[i].customerDto.lastName+" "+this.cartList[i].customerDto.firstName+'\n'+
        this.cartList[i].customerDto.telephone+'\n'+this.cartList[i].customerDto.email;
        str.replace("\n", "<br>");
        return  str
      } }
  }


  setOrderItems(order:Order){
    this.orderItemService.getOrderItemByOrder(order.id).subscribe(
      data=>{
        var orderItems:OrderItem[]=data as OrderItem[];
        order.orderItems=orderItems;
        this.confirmedOrderList.push(order)
      })
  }

  convert(date:Date){
    return  this.datepipe.transform(date, 'yyyy/MM/dd-hh:mm:ss')
    }
  
    convert2(date:Date){
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


    updateOrderStatus(e,id:any) {
    this.orderId=id;
    if(e.target.checked){  
     var order={status:"IN_DELIVERING"}
       this.orderService.updateOrder(id,order).subscribe(
         data=>{
         this.showPopUp();
       })          
         }
  }

   updateOrderStatusToLivred(e,id:any){
  this.orderId=id;
  if(e.target.checked){  
     var order={status:"LIVRED"}
     this.orderService.updateOrder(id,order).subscribe(
         data=>{
          this.sendNotificationMail(id);
          this.showPopUp2();
           })}
  }
          

     showPopUp()
     {this.showModal = true; }

     hidePopUp()
     {this.getConfirmedOrders(); 
     this.showModal = false; }

     showPopUp2()
     {this.showModal2 = true; }

     hidePopUp2()
     {this.getOrdersInDelivery(); 
     this.showModal2 = false; }
    

     getProductName(idProduct:any){
       for(var i=0;i<this.productList.length;i++){
         if(idProduct==this.productList[i].id){
           return this.productList[i].name
         }
       }

     }

     search() {
      // Declare variables
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      // Loop through all table rows, and hide those who don't match the search query
      // search by username
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          } } }
    
    }

    
    sendNotificationMail(orderId:any){
      for(var i=0;i<this.cartList.length;i++){
        if(this.cartList[i].orderId==orderId){
      var mail:Mail={to:this.cartList[i].customerDto.email,subject:"Votre commande sur AzizMarkrerPlace.tn est maintenant livrée",from:"Aziz-market-Place"}
      this.mailService.sendConfirmationMail(orderId,mail).subscribe(
      data=>{}
     )}
      }
    }
   
    
}


