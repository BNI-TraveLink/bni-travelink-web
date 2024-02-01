import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userId:any

  ngOnInit(): void {
    this.userId = localStorage.getItem('userID')
      
  }

  constructor(private service:LoginService, private route:Router, @Inject(DOCUMENT) private document: Document){}

  home(){
    this.route.navigate([''])
  }

  aboutUs(){
    this.document.location.href= 'https://www.bni.co.id/id-id/'
  }

  myOrder(){
    this.route.navigate(['myorder'])
  }

  logout(){
    this.service.logout()
  }
}
