import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {APP_BASE_HREF, DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BoardUserComponent } from './layouts/board-user/board-user.component';
import { RegisterComponent } from './repository/register/register.component';
import { LoginComponent } from './repository/login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ValidateEqualModule } from 'ng-validate-equal';
import { ReactiveFormsModule } from "@angular/forms";
import { IndexComponent } from './repository/index/index.component';
import { ProfilComponent } from './repository/profil/profil.component';
import { HomeComponent } from './repository/home/home.component';
import { ProductComponent } from './repository/product/product.component';
import { CategoryComponent } from './repository/category/category.component';
import { DataService } from './services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { CartComponent } from './repository/cart/cart.component';
import { PopUpLoginComponent } from './repository/popup/pop-up-login/pop-up-login.component';
import { OrderComponent } from './repository/order/order.component';
import { BoardAdminComponent } from './layouts/board-admin/board-admin.component';
import { RegisterAdminComponent } from './repositoryAdmin/register-admin/register-admin.component';
import { LoginAdminComponent } from './repositoryAdmin/login-admin/login-admin.component';
import { HomeAdminComponent } from './repositoryAdmin/home-admin/home-admin.component';
import { ProfilAdminComponent } from './repositoryAdmin/profil-admin/profil-admin.component';

import { ProductManagmentComponent } from './repositoryAdmin/product-managment/product-managment.component';
import { CategoryManagmentComponent } from './repositoryAdmin/category-managment/category-managment.component';
import { UsersManagmentComponent } from './repositoryAdmin/users-managment/users-managment.component';
import { ComptabilityComponent } from './repositoryAdmin/comptability/comptability.component';
import { CodeInputModule } from 'angular-code-input';
import { UserOrdersComponent } from './repository/user-orders/user-orders.component';
import { OrdersManagmentComponent } from './repositoryAdmin/orders-managment/orders-managment.component';
import { ProductDetailsComponent } from './repository/product-details/product-details.component';




const routes=[
  {path:'home', component:HomeComponent},
  { path: "category/:id", component: CategoryComponent},]

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule.forRoot(
      routes,
      {anchorScrolling: 'enabled',
    
    }
      

    ),
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    ValidateEqualModule,
    CodeInputModule
  ],
 
  declarations: [AppComponent, BoardUserComponent, RegisterComponent, LoginComponent, IndexComponent, ProfilComponent,HomeComponent, ProductComponent, CategoryComponent, CartComponent, PopUpLoginComponent, OrderComponent, BoardAdminComponent, RegisterAdminComponent, HomeAdminComponent, ProfilAdminComponent, ProductManagmentComponent, CategoryManagmentComponent, UsersManagmentComponent, ComptabilityComponent, UserOrdersComponent, OrdersManagmentComponent, ProductDetailsComponent,],
  providers: [DataService,authInterceptorProviders,DatePipe],
 //{ provide: LocationStrategy, useClass: HashLocationStrategy }
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
