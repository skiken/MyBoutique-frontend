import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-product-managment',
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.scss']
})
export class ProductManagmentComponent implements OnInit {
  productsList:Product[];
  selectedValue:number;
  selectedCategory:number;
  categoriesList:Category[];
  category:Category=new Category();
  product:Product=new Product();
  newProduct:Product=new Product();
  showProducts=true;
  addProduct=false;
  isSuccessful = false;
  updated=false;
  erreur = false;
  div1=true;
  updateselectedProduct=false;
  constructor(
    private router :Router,
    private tokenStorage:TokenStorageService,
    private productService:ProductService,
    private categorieservice:CategoryService
  ) {
    if (!this.tokenStorage.getUser()) {
      this.router.navigate(['/adminHome']);
  }
   }

  ngOnInit(): void {
    this.getAllCategories();
  }

  showTable(){
    this.showProducts=true;
    this.addProduct=false;
    this.updateselectedProduct=false;
    
  }
  showForm(){
    this.showProducts=false;
    this.addProduct=true;
    this.updateselectedProduct=false;
  }

  showUpdateForm(id:any){
    this.productService.getProductById(id).subscribe(
      newProduct=>this.newProduct=newProduct)
    this.updateselectedProduct=true;
    this.showProducts=true;
    this.addProduct=false;
  }
  
  closeModificationForm(){
    this.updateselectedProduct=false;
    this.updated=false;
  }

  getAllCategories(){
    this.categorieservice.getAllCategory().subscribe(
      data=>{
        this.categoriesList=data as Category[];
      }
    )
  }

  getAllProducts(){
    this.productService.getAllProductsByCategory(this.category.id).subscribe(
      data=>{
        this.productsList=data as Product[];
      }
    )
}

selected(){
  this.categorieservice.getCategoryByName(this.selectedValue).subscribe(
    data=>{
      this.category=data as Category;
      this.getAllProducts();
      this.product.categoryId=this.category.id;
    })
}
selectedcategory(){
  this.categorieservice.getCategoryByName(this.selectedCategory).subscribe(
    data=>{
      this.category=data as Category;
      this.getAllProducts();
      this.product.categoryId=this.category.id;
    })
}

createProduct(){
  this.productService.createProduct(this.product).subscribe(
    data=>{
      if(data==null){
        this.erreur = true;
      }
      else{
        var resetForm = <HTMLFormElement>document.getElementById("formNewProduct");
        resetForm.reset();
        this.isSuccessful = true;
        this.erreur = false;
        this.getAllProducts();
        
      }
    })
}

deleteProduct(id:any){
  this.productService.deleteProduct(id).subscribe(
    data=>{
      this.getAllProducts()
    })
}

updateProduct(id:any){
  this.productService.updateProduct(id,this.newProduct).subscribe(
    data=>{
      var resetForm = <HTMLFormElement>document.getElementById("formUpdateProduct");
        resetForm.reset();
        this.updated=true;
         this.getAllProducts()
    }
  )
}

hide(){
  this.div1=false;
}
show(){
 this.div1=true;
}

countProductInStock(total:number,sales:number){
return total-sales;
}


}
