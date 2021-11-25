import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
 
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  
  {
    path: "/adminProfil",
    title: "Profile",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/categoriesManagment",
    title: "Gestion des Categories",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/productsManagment",
    title: "Gestion des Produits",
    icon: "icon-tag",
    class: ""
  },
  {
    path: "/ordersManagment",
    title: "Gestion des Commandes",
  
    icon: "icon-app",
    class: ""
  },
  {
    path: "/usersManagment",
    title: "Tableau de Bord Client",
    
    icon: "icon-settings-gear-63",
    class: "" },
  {
    path: "/comptability",
    title: "Comptabilité",
  
    icon: "icon-money-coins",
    class: ""
  },

  
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
