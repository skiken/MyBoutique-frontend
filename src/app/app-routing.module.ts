import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapComponent } from './pages/map/map.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UserComponent } from './pages/user/user.component';
import { TablesComponent } from './pages/tables/tables.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { BoardUserComponent } from './layouts/board-user/board-user.component';
import { RegisterComponent } from './repository/register/register.component';
import { LoginComponent } from './repository/login/login.component';
import { IndexComponent } from './repository/index/index.component';
import { ProfilComponent } from './repository/profil/profil.component';
import { HomeComponent } from './repository/home/home.component';
import { CategoryComponent } from './repository/category/category.component';
import { CartComponent } from './repository/cart/cart.component';
import { OrderItemService } from './services/order-item.service';
import { OrderComponent } from './repository/order/order.component';
import { BoardAdminComponent } from './layouts/board-admin/board-admin.component';
import { RegisterAdminComponent } from './repositoryAdmin/register-admin/register-admin.component';
import { HomeAdminComponent } from './repositoryAdmin/home-admin/home-admin.component';
import { LoginAdminComponent } from './repositoryAdmin/login-admin/login-admin.component';
import { CategoryManagmentComponent } from './repositoryAdmin/category-managment/category-managment.component';
import { ProfilAdminComponent } from './repositoryAdmin/profil-admin/profil-admin.component';
import { ProductManagmentComponent } from './repositoryAdmin/product-managment/product-managment.component';
import { UsersManagmentComponent } from './repositoryAdmin/users-managment/users-managment.component';
import { ComptabilityComponent } from './repositoryAdmin/comptability/comptability.component';
import { UserOrdersComponent } from './repository/user-orders/user-orders.component';
import { OrdersManagmentComponent } from './repositoryAdmin/orders-managment/orders-managment.component';
import { ProductDetailsComponent } from './repository/product-details/product-details.component';


const routes: Routes = [

  {path:"signin",component:LoginComponent},
  {path:"signup",component:RegisterComponent},
  {path: "adminSignup", component: RegisterAdminComponent  },
  {path: "",component: BoardAdminComponent,
  children: [
    { path: "adminSignin", component: LoginAdminComponent  },
    { path: "adminHome", component: HomeAdminComponent},
    { path: "adminProfil", component: ProfilAdminComponent},
    { path: "categoriesManagment", component:CategoryManagmentComponent},
    { path: "productsManagment", component: ProductManagmentComponent},
    { path: "usersManagment", component: UsersManagmentComponent},
    { path: "ordersManagment", component: OrdersManagmentComponent},
    { path: "comptability", component: ComptabilityComponent},
  ]},
  {path: "",component: BoardUserComponent,
  children: [
    { path: "dashboard", component: DashboardComponent },
    { path: "icons", component: IconsComponent },
    { path: "maps", component: MapComponent },
    { path: "notifications", component:NotificationsComponent },
    { path: "tables", component: TablesComponent },
    { path: "typography", component: TypographyComponent } ,
    { path: "home",component: HomeComponent},
    { path: "profil", component: ProfilComponent},
    { path: "userOrders", component: UserOrdersComponent}, 
    { path: "category/:idCategory", component: CategoryComponent},
    { path: "product/:idProduct", component: ProductDetailsComponent},
    { path: "cart", component: CartComponent},
    { path: "order", component: OrderComponent}, 
  ]},
  {path: "**", redirectTo: "home"},
  {path: "",   redirectTo: "home", pathMatch: "full" },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
