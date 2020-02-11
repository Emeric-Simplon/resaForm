import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  @Input() price: number;

  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 3 * 7));
  maxWeeks = 1;
  maxWeeksOptions = [];
  totalPrice = 0;
  totalIsEnable = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onValueChanges();
    this.totalIsEnable = false;
    console.log(this.totalIsEnable);
  }

  myForm = new FormGroup({
    lastname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]")]),
    firstname: new FormControl("", [Validators.required]),
    adress: new FormControl("", [Validators.required]),
    zip: new FormControl("", [Validators.required, Validators.pattern('[0-9]{5}')]),
    phone: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    numberOfWeeks: new FormControl("", [Validators.required])
  });
  onSubmit() {
    if (this.myForm.valid) {
      const remainingPlacesAfterSubmit =
        parseInt(localStorage.getItem("places")) - 1;
      localStorage.setItem("places", remainingPlacesAfterSubmit.toString());
      this.router.navigate(['/success']);
    }
  }

  onValueChanges(): void {
    this.myForm.get("date").valueChanges.subscribe(val => {
      this.maxWeeks = (this.maxDate.getTime() - val.getTime()) / 1000;
      this.maxWeeks /= 60 * 60 * 24 * 7;
      this.maxWeeks = Math.abs(Math.ceil(this.maxWeeks));
      this.maxWeeksOptions = [];

      while (this.maxWeeks != 0) {
        this.maxWeeksOptions.push(this.maxWeeks);
        this.maxWeeks--;
      }
    });
    this.myForm.get("numberOfWeeks").valueChanges.subscribe(val => {
      this.totalIsEnable = true;
      this.totalPrice =
        this.myForm.controls["numberOfWeeks"].value * this.price;
    });
  }
}
