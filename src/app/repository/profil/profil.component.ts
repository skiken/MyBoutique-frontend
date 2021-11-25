import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';
import { PdfService } from 'src/app/services/pdf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  currentUser: any;
  username:String;
  mobNumberPattern ="^(5|2|9)+[0-9]{7}$";                   
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  customer: Customer=new Customer();
  address: Address=new Address();
   url: any;
   product:Product;
   test:String;
   hide: boolean = true;
   
  constructor( private router: Router, private tokenStorage:TokenStorageService,  private userService :UserService,private cookieService:CookieService) {
    if (!this.tokenStorage.getUser()) {
      this.router.navigate(['/home']);
  }
   }

   

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.username=this.currentUser.username;
    this.reloadData();
  }

 

  getLocal(key: string): any {
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  reloadData() {
    this.userService.getCustomer(this.username).subscribe(
      customer => this.customer = customer
    );
    this.address=this.customer.address;
  }

  onSubmit() {
    this.customer.address=this.address;
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

  myFunction() {
    this.hide = !this.hide;
  }

  ok(){
    this.cookieService.deleteAll();
    this.tokenStorage.signOut();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        
      }
    }
}
  


}
