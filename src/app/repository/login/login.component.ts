import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/model/customer';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/model/cart';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  div1: boolean=false;
  isLoggedIn = false;
 
  
  hidepassword: boolean = true;
  constructor(
    private cookieService: CookieService,
    private router :Router,
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private userService:UserService,
    private cartService:CartService
   
     ) {

    if (this.tokenStorage.getUser()) {
      this.router.navigate(['/home']);
  }
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
            var resetForm = <HTMLFormElement>document.getElementById("form");
            resetForm.reset();
            this.router.navigateByUrl('/home');
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
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      }
    );
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
            localStorage.setItem("activeCart",JSON.stringify(cart[0].id))
          })
      })
   }


  hide(){
    this.div1=false;
  }
  show(){
   this.div1=true;
  }

myFunction() {
    this.hidepassword = !this.hidepassword;
  }
}
