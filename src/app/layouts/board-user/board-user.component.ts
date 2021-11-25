import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
 
  constructor() {
    
  
  }
 
  changeDashboardColor(color="white-content"){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
   
  }
  ngOnInit() {
    this.changeDashboardColor("white-content");
  }







}
