import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.scss'
})
export class CompleteComponent {

  constructor(private router:Router){}

  toMyOrder(){
    this.router.navigateByUrl('/myorder',{replaceUrl:true});
    localStorage.removeItem("orderID")
    sessionStorage.clear()
  }

}
