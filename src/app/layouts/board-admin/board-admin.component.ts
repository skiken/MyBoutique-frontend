import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  constructor() { }


  
  changeDashboardColor(color="black-content"){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'black-content') {
        body.classList.add(color);
    }
   
  }
  ngOnInit() {
    this.changeDashboardColor("black-content");
  }

}
