import { Component, OnInit, ElementRef, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit{
  closeResult: string;
  visible: boolean;
  product:Product;
  porductListIdInCart:number[]=[];
  idProduct:number;
  productInCartLenght:number;
  categories=[];
  subscription: Subscription;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private tokenStorage: TokenStorageService,
    private categoryService: CategoryService,
    private cookieService: CookieService, 
    private dataService:DataService,
    private activeRoute: ActivatedRoute
  )
  
   {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
  }
   
  ngOnInit() {
    this.getAllCategories();
    if(localStorage.getItem("products")){
    this.porductListIdInCart=JSON.parse(localStorage.getItem("products"))}
    this.subscription=this.dataService.currentProductNumber.subscribe(i=>this.productInCartLenght=i);
    this.show();
    this.hide();
    
  }


 getAllCategories(){
  this.categoryService.getAllCategory().subscribe(categories => this.categories = categories);
 }
 
 logout() {
    this.tokenStorage.signOut();
    this.cookieService.deleteAll();
    window.location.reload();
    localStorage.removeItem("username");
    localStorage.removeItem("activeCart");
}

  hide() { 
 if( this.tokenStorage.getUser()){
  this.visible = true; 
 }}

  show() {
  if( !this.tokenStorage.getUser()){
    this.visible = false; 
   }}

   open(content) {
    this.modalService.open(content, {windowClass:'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
