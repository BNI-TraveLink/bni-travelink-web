import { Component, OnInit } from '@angular/core';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.scss'
})
export class MyorderComponent implements OnInit {
  ticketByUser: any = []

  ngOnInit(): void {
  }

  constructor(private service: TicketService){}
}
