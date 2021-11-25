import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pop-up-login',
  templateUrl: './pop-up-login.component.html',
  styleUrls: ['./pop-up-login.component.scss']
})
export class PopUpLoginComponent implements OnInit {

  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  div1: boolean=true;
  isLoggedIn = false;
  customer:Customer;
  cart:Cart;
  hidepassword: boolean = true;
  constructor(
    private router :Router,
     private authService: AuthService, 
     private tokenStorage: TokenStorageService,
     private userService:UserService,
     private cartService:CartService,
     private cookieService: CookieService
     ) {

   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        for(var i=0;i<this.roles.length;i++){
          if(this.roles[i]=="USER"){
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            localStorage.setItem("username",this.form.username);
            this.createCartAndOrder();
            this.reloadComponent();
          }
          else{
            this.tokenStorage.signOut();
            localStorage.removeItem("username");
            this.errorMessage="Ceci n'est pas un compte Utilisateur"
            this.isLoginFailed = true;
          }
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  hide(){
    this.div1=false;
  }
  show(){
   this.div1=true;
  }

  reloadComponent(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


  createCartAndOrder(){
    this.userService.getCustomer(localStorage.getItem("username")).subscribe(
      data=>{
        var customer=data as Customer
        this.cartService.createCart(customer.id).subscribe(
          data => {},
          err => {
            console.log(err.error.message);
          })
        this.cartService.getByCustomerIdAndStatusNew(customer.id).subscribe(
          data=>{
            var cart:Cart[]= data as Cart[];
            console.log(cart);
            localStorage.setItem("activeCart",JSON.stringify(cart[0].id))
          })
      })
   }

   myFunction() {
    this.hidepassword = !this.hidepassword;
  }


}
