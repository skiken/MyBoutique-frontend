import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.scss']
})
export class ProfilAdminComponent implements OnInit {
  currentUser: any;
  username:String; 
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  customer: Customer=new Customer();
   url: any;
   test:String;
   hide: boolean = true;
  constructor(private router: Router, private tokenStorage:TokenStorageService,  private userService :UserService) {
    if (!this.tokenStorage.getUser()) {
      this.router.navigate(['/adminHome']);
  }
   }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.username=this.currentUser.username;
    this.reloadData();
  }

  reloadData() {
    this.userService.getCustomer(this.username).subscribe(
      customer => this.customer = customer
    );
  }

  myFunction() {
    this.hide = !this.hide;
  }

  onSubmit() {
    this.customer.matchingPassword=this.customer.password;
    this.userService.updateCustomer(this.username,this.customer).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        var resetForm = <HTMLFormElement>document.getElementById("form");
        resetForm.reset();
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  ok(){
    this.tokenStorage.signOut();
    this.router.navigate(['/adminHome']);
    window.location.reload();
  }

}
