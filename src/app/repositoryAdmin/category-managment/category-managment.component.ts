import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category-managment',
  templateUrl: './category-managment.component.html',
  styleUrls: ['./category-managment.component.scss']
})
export class CategoryManagmentComponent implements OnInit {

  categoriesList:Category[];
  category:Category=new Category;
  newCategory:Category=new Category;
  isSuccessful = false;
  updated=false;
  erreur = false;
  div1=true;
  showCategoies=true;
  addCategory=false;
  updateselectedCategory=false;
  showModal:boolean;
  categoryIdToDelete:any;
  constructor(
    private categorieservice :CategoryService,
    private router :Router,
    private tokenStorage:TokenStorageService
    ) { 
      if (!this.tokenStorage.getUser()) {
        this.router.navigate(['/adminHome']);
    }
    }

  ngOnInit(): void {
    this.getAllCategories();
  }

  showDeletePopUp(categoryId:number)
  {
      this.showModal = true; 
      this.categoryIdToDelete=categoryId;
  }
  hideDeletePopUp()
  {
    this.showModal = false;
  }

 
  showTable(){
    this.showCategoies=true;
    this.addCategory=false;
    this.updateselectedCategory=false;
    
  }
  showForm(){
    this.showCategoies=false;
    this.addCategory=true;
    this.updateselectedCategory=false;
  }

  closeModificationForm(){
    this.updateselectedCategory=false;
    this.updated=false;
  }

  showUpdateForm(id:any){
    this.categorieservice.getCategoryById(id).subscribe(
      newCategory=>this.newCategory=newCategory)
    this.updateselectedCategory=true;
    this.showCategoies=true;
    this.addCategory=false;
  }


  getAllCategories(){
    this.categorieservice.getAllCategory().subscribe(
      data=>{
        this.categoriesList=data as Category[];
      }
    )
  }

  createCategory(){
  this.categorieservice.createCategory(this.category).subscribe(
    data=>{
      if(data==null){
        this.erreur = true;
      }
      else{
        this.isSuccessful = true;
        this.erreur = false;
        var resetForm = <HTMLFormElement>document.getElementById("formNewCategorie");
        resetForm.reset();
        this.getAllCategories();
        
      }
    })
    
  }

  deleteCategory(){
    this.categorieservice.deleteCategory(this.categoryIdToDelete).subscribe(
      data=>{
        this.getAllCategories()
      },)
      this.hideDeletePopUp()}

  updateCategory(id:any){
    this.categorieservice.updateCategory(id,this.newCategory).subscribe(
      data=>{
        var resetForm = <HTMLFormElement>document.getElementById("formUpdateCategorie");
        resetForm.reset();
        this.updated=true;
         this.getAllCategories()
        },)}

 
  hide(){
    this.div1=false;
  }
  show(){
   this.div1=true;
  }
}


