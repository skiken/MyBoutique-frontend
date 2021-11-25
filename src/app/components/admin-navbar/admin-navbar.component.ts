import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  connected=false;
  div1: boolean=false;
  showModal: boolean;
  div2: boolean=false;
  
  constructor(private tokenStorageService:TokenStorageService,private router :Router) { }

  ngOnInit(): void {
  }

  showConnectionPopUp()
  {
    if(!this.tokenStorageService.getUser()){
      this.showModal = true; 
  }
  else{
    this.connected=true
    this.show();
  }

  }
  hideConnectionPopUp()
  {
    this.showModal = false;
  }

  hide(){
    this.div1=false;
  }
  show(){
   this.div1=true;
  }

  hideAlert(){
    this.div2=false;
  }
  showAlert(){
   this.div2=true;
  }

  moveToRegistration(){
      if(!this.tokenStorageService.getUser()){
        this.router.navigate(["/adminSignup"]);
    }
    else{
      this.showAlert();
    }
  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
