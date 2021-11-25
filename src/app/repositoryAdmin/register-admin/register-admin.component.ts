import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  div1: boolean=true;
  hidepassword: boolean = true;
  mobNumberPattern ="^(5|2|9)+[0-9]{7}$";                   
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  constructor(private authService: AuthService,private router :Router, private tokenStorage: TokenStorageService) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['/adminHome']);
  }
   }

  ngOnInit(): void {
  }
  onSubmit() {
    this.form.roles = "ADMIN";
    
    this.authService.register(this.form).subscribe(
      data => {
        var resetForm = <HTMLFormElement>document.getElementById("form");
        resetForm.reset();
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
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
