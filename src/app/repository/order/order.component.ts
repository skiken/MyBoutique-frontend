import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { Mail } from 'src/app/model/Mail';
import { Order } from 'src/app/model/Order';
import { OrderItem } from 'src/app/model/orderItem';
import { Payment } from 'src/app/model/payment';
import { Product } from 'src/app/model/product';
import { Sms } from 'src/app/model/sms';
import { ProductManagmentComponent } from 'src/app/repositoryAdmin/product-managment/product-managment.component';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { MailService } from 'src/app/services/mail.service';
import { OrderItemService } from 'src/app/services/order-item.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductService } from 'src/app/services/product.service';
import { SmsService } from 'src/app/services/sms.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  currentUser: any;
  username:String;
  customer: Customer=new Customer();
  newCustomer: Customer=new Customer();
  commandPrice:number=0;
  deliveryPrice:number=7;
  totalPrice:number=0;
  orderItemsList:OrderItem[]=[];
  productList:Product[]=[];
  quantityList:number[]=[];
  smsDiv:boolean=false;
  validTelError:boolean=false;
  validAddressError:boolean=false;
  errorCodeMessage:boolean=false;
  showModal:boolean=false;
  executeOnce:boolean=false;
  verificationNumber:string;
  payment:Payment=new Payment();
  mobNumberPattern ="^(5|2|9)+[0-9]{7}$";                   
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  
  constructor(private router: Router, 
  private tokenStorage:TokenStorageService,
  private userService :UserService,
  private orderService:OrderService,
  private cartService:CartService,
  private cookieService:CookieService,
  private itemOrderService: OrderItemService,
  private productService:ProductService,
  private modalService: NgbModal,
  private dataService:DataService,
  private smsService :SmsService,
  private mailService:MailService,
  private paymentService:PaymentService,
  ) 
  {
    if (!this.tokenStorage.getUser()) {
      this.router.navigate(['/home']);
  }
   }

   

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.username=this.currentUser.username;
    this.reloadData();
    this.getOrder();
    console.log(this.orderItemsList)
    
  }


  reloadData() {
    this.userService.getCustomer(this.username).subscribe(
      data=>{
        this.customer=data as Customer;
      });  
  }


  reloadDataToUpdate() {
    this.userService.getCustomer(this.username).subscribe(
      data=>{
        this.newCustomer=data as Customer;}); 
  }
  


  openModificationPopup(content) {
    this.modalService.open(content, { size: 'lg' });
    this.reloadDataToUpdate();
   }

  openSmsDiv(){
    this.userService.getCustomer(this.username).subscribe(
      data=>{
        var customer=data as Customer;
        if(customer.telephone==null || customer.telephone==""){
          this.validTelError=true;
        }  
        if(customer.address.address==null || customer.address.address=="" &&
        customer.address.city==null || customer.address.city=="" && 
        customer.address.contry==null || customer.address.contry=="" && 
        customer.address.postcode==null || customer.address.postcode=="" ){
          this.validAddressError=true;
        }  
        else{
          if(!this.executeOnce) {
            this.executeOnce=true;
            this.verificationNumber=JSON.stringify(Math.floor(Math.random()*90000) + 10000);
            this.sendSms(this.verificationNumber);
            console.log(this.verificationNumber)
            this.smsDiv=true;
           }}
          });
        }

  sendSms(code:string){
    this.userService.getCustomer(localStorage.getItem("username")).subscribe(
      data=>{
        var customer:Customer=data as Customer;
        var sms:Sms={to:"+216"+JSON.stringify(customer.telephone),
        message:"Pour confirmer votre commande sur le site Aziz-Market-Place,veuillez renseigner le code suivant sur le site: "+code}
       /*
        this.smsService.sendSms(sms).subscribe(
          data=>{}
        )
        */
      }
    )
  }

 

  sendAnotherSms(){
    if(this.executeOnce){
      this.executeOnce=false;
      this.openSmsDiv();
    }
  }

  sendMail(){
    this.cartService.getById(localStorage.getItem("activeCart")).subscribe(
      data=>{
      var cart=data as Cart
    this.userService.getCustomer(localStorage.getItem("username")).subscribe(
      data=>{
        var customer:Customer=data as Customer;
    var mail:Mail={to:customer.email,subject:"Votre commande sur AzizMarkrerPlace.tn est maintenant terminée",from:"Aziz-market-Place"}
     this.mailService.sendOrderMail(cart.orderId,mail).subscribe(
       data=>{}
     )
      })

    })
  }

  

  updateOrder(payment:Payment){
    var order={status:"CONFIRMED",shipped:new Date(),paymentId:payment.id}
    this.cartService.getById(localStorage.getItem("activeCart")).subscribe(
      data=>{
        var cart=data as Cart
        this.orderService.updateOrder(cart.orderId,order).subscribe(
          data=>{ })
      })
    }
   
   
  createPayment(){
    this.cartService.getById(localStorage.getItem("activeCart")).subscribe(
      data=>{
        var cart:Cart=data as Cart;
        var payment={status:"CREATION",orderId:cart.orderId};
        this.paymentService.createPayment(payment).subscribe(
         pay=>this.payment=pay
       )
      }
    )
  }


  updateProductSales(){
    for(var i=0;i<this.orderItemsList.length;i++){
      var quantity=this.orderItemsList[i].quantity;
      var productId=this.orderItemsList[i].productId;
      this.productService.getProductById(productId).subscribe(
        data=>{
          var product:Product=data as Product;
          var sales=product.salesCounter;
          var updatedProduct={salesCounter:(sales+quantity)}
          this.productService.updateProduct(productId,updatedProduct).subscribe(
            data=>{}
          )
        }
      )
    }
  }
  onCodeCompleted(code: string) {
    if(this.verificationNumber==code){
    this.createPayment();
    this.updateProductSales();
      var cartId:number=JSON.parse(localStorage.getItem("activeCart"));
      this.cartService.updateCart(cartId).subscribe(
      data=>{})
      this.sendMail();
      this.updateOrder(this.payment);
      localStorage.removeItem("activeCart");
      localStorage.removeItem("products")
      this.createNewCartAndOrder();
      this.showValidationPopUp();
        
    }
    else{
      this.errorCodeMessage=true;
    }}

  onCodeChanged(code: string){
    this.errorCodeMessage=false;
  }

  
  getOrder(){
    this.productList=[];
    this.cartService.getById(localStorage.getItem("activeCart")).subscribe(
      data=>{
        
         var cart:Cart;
         cart=data as Cart;
         this.orderService.getOrderById(cart.orderId).subscribe(
           data=>{
            var order=data as Order;
            this.commandPrice=order.totalPrice;
            this.totalPrice=this.deliveryPrice+this.commandPrice;
           })
          this.itemOrderService.getOrderItemByOrder(cart.orderId).subscribe(
            data=>{
              var orderItemsList:OrderItem[];
              orderItemsList= data as OrderItem[];
              for(var i=0;i<orderItemsList.length;i++){
                this.orderItemsList.push(orderItemsList[i]);
                this.productService.getProductById(orderItemsList[i].productId).subscribe(
                  data=>{
                    var product:Product=data as Product
                    this.productList.push(product)
                  })
              }})
        })      
  }



  reloadComponent(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


 cancelOrder(){
  this.cartService.getById(localStorage.getItem("activeCart")).subscribe(
    data=>{
       var cart:Cart;
       cart=data as Cart
       this.itemOrderService.deleteOrderItemByOrderId(cart.orderId).subscribe(
          data=>{
          })
        var order={totalPrice:0,status:"CREATION",shipped:null}
        this.orderService.updateOrder(cart.orderId,order).subscribe(
          data=>{
          })
        })
        this.router.navigate(['/home']);     
 }


  onSubmit() {
    this.userService.updateCustomer(this.username,this.newCustomer).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        var resetForm = <HTMLFormElement>document.getElementById("formUpdate");
        resetForm.reset();
        this.reloadComponent(); 
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  hideTelError(){
    this.validTelError=false; 
  }
  hideAddressError(){
    this.validAddressError=false; 
  }

  showValidationPopUp(){
      this.showModal = true;}

  hideValidationPopUp()
  {
  this.showModal = false;
  this.dataService.addProduct(0);
  this.router.navigateByUrl('/home');
  }

  createNewCartAndOrder(){
    this.userService.getCustomer(localStorage.getItem("username")).subscribe(
      data=>{
        var customer=data as Customer
        this.cartService.createCart(customer.id).subscribe(
          data => {},
          err => {
            console.log(err.error.message);
          })
      })
   }
    





  


}