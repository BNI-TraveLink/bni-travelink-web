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

  ngOnInit(): void {
    const userID = localStorage.getItem('userID')
    console.log(userID)
    this.service.showAllTicket(userID!).pipe(delay(5000)).subscribe(response=>{
      this.ticketByUser = response
      this.loading = false
      console.log("Data",response)
    })
  }

  constructor(private service: TicketService, private datePip:DatePipe){}

  //ubah format date nya disini
  formatDate(tglTransaksi:string):string{
    const parsedDate = new Date(tglTransaksi);
    const formatDate = this.datePip.transform(parsedDate,'dd MMM yy HH:mm:ss')
    return formatDate || ''
  }
}
