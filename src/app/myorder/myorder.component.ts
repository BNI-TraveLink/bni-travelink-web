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
  itemsPerPage: number = 5;
  currentPage: number = 1;

  get totalPages(): number {
    return Math.ceil(this.ticketByUser.length / this.itemsPerPage);
  }

  get visibleTickets(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.ticketByUser.slice(startIndex, endIndex);
  }

  get pageNumbers(): number[] {
    const totalVisiblePages = 5; // You can adjust this value based on your preference
    const startPage = Math.max(1, this.currentPage - Math.floor(totalVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + totalVisiblePages - 1);

    return Array(endPage - startPage + 1).fill(0).map((_, i) => startPage + i);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



  ngOnInit(): void {
    const userID = localStorage.getItem('userID')
    console.log(userID)
    this.service.showAllTicket(userID!).pipe(delay(3000)).subscribe(response=>{
      this.ticketByUser = response.sort((last, first)=>{
        const firstDate = new Date(first.createdAt).getTime()
        const lastDate = new Date(last.createdAt).getTime()
        this.getIconPath(first.service.name)
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

  getIconPath(serviceName: string): string {
    switch(serviceName) {
      case 'KRL':
        return '/assets/images/icon-krl.svg';
      case 'TJ':
        return '/assets/images/tj-enable.svg';
      case 'LRT':
        return '/assets/images/lrt-enable.svg';
      case 'MRT':
        return '/assets/images/mrt-enable.svg';
      default:
        return '/assets/images/icon-krl.svg';
    }
  }
}
