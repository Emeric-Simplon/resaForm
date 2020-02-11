import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-successfull',
  templateUrl: './successfull.component.html',
  styleUrls: ['./successfull.component.css']
})
export class SuccessfullComponent implements OnInit {

  reservationNumber: Number;

  constructor() { }

  ngOnInit(): void {
    this.reservationNumber = new Date().getTime();
  }

}
