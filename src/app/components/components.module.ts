import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { LoginAdminComponent } from '../repositoryAdmin/login-admin/login-admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,FormsModule,
    HttpClientModule,],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, AdminNavbarComponent,LoginAdminComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent,AdminNavbarComponent]
})
export class ComponentsModule {}
