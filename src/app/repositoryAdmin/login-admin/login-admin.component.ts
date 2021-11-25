import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  div1: boolean=false;
  hidepassword: boolean = true;
  isLoggedIn = false;
  constructor(  
    private router :Router,
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,) { 
      if (this.tokenStorage.getUser()) {
        this.router.navigate(['/adminHome']);
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
          if(this.roles[i]=="ADMIN"){
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            window.location.reload();
          }
          else{
            this.tokenStorage.signOut();
            this.errorMessage="Ceci n'est pas un compte Administrateur"
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

  myFunction() {
    this.hidepassword = !this.hidepassword;
  }

  hide(){
    this.div1=false;
  }
  show(){
   this.div1=true;
  }

  





 

}
