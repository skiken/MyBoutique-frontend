import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  roles: string[] = [];
  
  constructor( private router: Router,
    
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    
  }

}
