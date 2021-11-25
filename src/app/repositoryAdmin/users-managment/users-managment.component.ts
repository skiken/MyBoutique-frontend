import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { ProductManagmentComponent } from '../product-managment/product-managment.component';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html',
  styleUrls: ['./users-managment.component.scss']
})


export class UsersManagmentComponent implements OnInit {
  showUsers=true;
  usersList:Customer[];
  customer:Customer=new Customer();
  orderList:Order[]=[];
  product:Product=new Product();
  productList:Product[]=[];
  blob:any;
 

  constructor(
    private userService : UserService,
    private modalService: NgbModal,
    private cartService:CartService,
    private orderService:OrderService,
    private productService:ProductService,
    private orderItemService:OrderItemService,
    private tokenStorage:TokenStorageService,
    private router:Router,
    private datepipe: DatePipe,
    private  pdfService:PdfService
  ) {
    if (!this.tokenStorage.getUser()) {
      this.router.navigate(['/adminHome']);
  }
   }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProduct(); 
    
   }
   
 

  getAllProduct(){
    this.productService.getAllProducts().subscribe(
    productList=>this.productList=productList
    )}

  getProductName(id:any){
 for(var i=0;i<this.productList.length;i++){
   if(this.productList[i].id==id){
     return this.productList[i].name;
   }}
  }


  openUserHistorique(content,customerId:any) {
    this.orderList=[];
    this.modalService.open(content, { size: 'lg' });
    this.userService.getById(customerId).subscribe(
      customer=>this.customer=customer)
    this.cartService.getByCustomerIdAndStatusConfirmed(customerId).subscribe(
      data=>{
       var cart:Cart[]=data as Cart[];
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
          })}})
       }
       
      
  
  showTable(){
    this.showUsers=true;
  }


  getAllUsers(){
    this.userService.getAllCustomerByRole("USER").subscribe(
      data=>{
        this.usersList=data as Customer[];
      })
}

convert(date:Date){
return  this.datepipe.transform(date, 'yyyy/MM/dd')
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
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      } } }
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



}
