import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successfull',
  templateUrl: './successfull.component.html',
  styleUrls: ['./successfull.component.css']
})
export class SuccessfullComponent implements OnInit {

  reservationNumber: Number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.reservationNumber = new Date().getTime();
  }
  backToHome(): void {
    this.router.navigate(["/"]);
  }
}
