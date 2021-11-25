import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  div1: boolean=true;
  hidepassword: boolean = true;
  mobNumberPattern ="^(5|2|9)+[0-9]{7}$";                   
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  constructor(private authService: AuthService,private router :Router, private tokenStorage: TokenStorageService ) { 
    
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['/home']);
  }
  }

  ngOnInit() {}

  onSubmit() {
    this.form.roles = "USER";
    
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

