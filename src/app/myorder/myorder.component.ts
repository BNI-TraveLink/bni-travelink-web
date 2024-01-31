import { Component, OnInit } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../models/ticket';
import { delay } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.scss'
})
export class MyorderComponent implements OnInit {
  ticketByUser: Ticket[] = []
  loading = true
  pageSize = 5;
  currentPage = 1;
  totalPages: any;
  pagedTicketData: Ticket[] = [];
  pages: number[] = [];

  ngOnInit(): void {
    const userID = localStorage.getItem('userID')
    console.log(userID)
    this.service.showAllTicket(userID!).pipe(delay(3000)).subscribe(response=>{
      this.ticketByUser = response.sort((last, first)=>{
        const firstDate = new Date(first.createdAt).getTime()
        const lastDate = new Date(last.createdAt).getTime()
        return firstDate - lastDate;
      })
      this.loading = false;
    })
  }

  constructor(private service: TicketService, private datePip:DatePipe){}

  //ubah format date nya disini
  formatDate(tglTransaksi:string):string{
    const parsedDate = new Date(tglTransaksi);
    const formatDate = this.datePip.transform(parsedDate,'dd MMM yy HH:mm:ss')
    return formatDate || ''
  }

  // Pagination
  changePage(page: number | string): void {
    if (typeof page === 'number') {
        this.currentPage = page;
    } else if (page === 'prev' && this.currentPage > 1) {
        this.currentPage--;
    } else if (page === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
    }

    this.updatePagedData();
    this.updatePages();
}

  // Update the method to update pagedTicketData based on current page
  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedTicketData = this.ticketByUser.slice(startIndex, endIndex);
}


  updatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
    }
}
}
