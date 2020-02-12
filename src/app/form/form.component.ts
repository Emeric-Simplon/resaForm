import { GetCityService } from "./../services/get-city.service";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  // Prix d'un emplacement
  @Input() price: number;

  //Range de date qu'il est possible de prendre
  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 3 * 7));

  //Nombre de semaine qu'il sera possible de prendre en fonction de la date choisi
  maxWeeks: number;

  //Tableau qui servira à créer le nombre d'option dans l'input select
  maxWeeksOptions: Array<any>;

  totalPrice: number;

  //Si une date est selectionnée affichera le tarif
  totalIsEnable: boolean;

  city$: Observable<any>;

  constructor(private router: Router, private getCityService: GetCityService) {}

  ngOnInit(): void {
    this.onValueChanges();
    this.totalIsEnable = false;
  }

  regexForNames = "^[a-zA-Zàâéèëêïîôùüç -]{1,40}$";

  myForm = new FormGroup({
    lastname: new FormControl("", [
      Validators.required,
      Validators.pattern(this.regexForNames)
    ]),
    firstname: new FormControl("", [
      Validators.required,
      Validators.pattern(this.regexForNames)
    ]),
    adress: new FormControl("", [Validators.required]),
    zip: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]{5}")
    ]),
    city: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]{10}")
    ]),
    date: new FormControl("", [Validators.required]),
    numberOfWeeks: new FormControl("", [Validators.required])
  });

  onSubmit() {
    if (this.myForm.valid) {
      //Décrémente le nombre de places de 1 si la réservation est valide
      const remainingPlacesAfterSubmit =
        parseInt(localStorage.getItem("places")) - 1;
      localStorage.setItem("places", remainingPlacesAfterSubmit.toString());

      //Redirection ver la page de succès
      this.router.navigate(["/success"]);
    }
  }

  //Fonction appelée lors de la perte de focus permet l'autocomplétion de l'input city
  getCity() {
    if (this.myForm.get("zip").value) {
      this.getCityService
        .getCity(this.myForm.get("zip").value)
        .subscribe(data => {
          this.city$ = data.cities[0].city;
          this.myForm.get("city").setErrors(null);
        });
    }
  }

  onValueChanges(): void {
    this.myForm.get("date").valueChanges.subscribe(val => {
      //On convertit les dates en timestamp
      this.maxWeeks = (this.maxDate.getTime() - val.getTime()) / 1000;

      //On en déduit le nombre de semaine qu'il est possible de prendre
      this.maxWeeks /= 60 * 60 * 24 * 7;
      this.maxWeeks = Math.abs(Math.ceil(this.maxWeeks));
      this.maxWeeksOptions = [];

      //On push dans le tableau autant de semaine qu'il est possible de prendre
      //Cela permet de créer un range d'option dans l'input select
      while (this.maxWeeks != 0) {
        this.maxWeeksOptions.push(this.maxWeeks);
        this.maxWeeks--;
      }
    });

    //En fonction du nombre de semaine choisi on calcule le total
    this.myForm.get("numberOfWeeks").valueChanges.subscribe(val => {
      this.totalPrice =
        this.myForm.controls["numberOfWeeks"].value * this.price;

      //On affiche le total
      this.totalIsEnable = true;
    });
  }
}
