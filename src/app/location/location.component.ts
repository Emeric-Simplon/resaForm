import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent implements OnInit {
  public constructor() {}

  places = parseInt(localStorage.getItem("places"));
  
  //Prix initial d'un place sans majoration
  price = 2000;

  //Affiche ou non le message d'avertissement des places restant
  cautionIsEnble = false;

  ngOnInit(): void {
    this.cautionIsEnble = false;

    //Si le nombre de places restantes n'a jamais été ajouté on en ajoute 10 dans le localstorage
    if (!this.places) {
      localStorage.setItem("places", "10");
    }
    //Lors de l'initialisation on vérifie le nombre de places restantes et on applique le tarif adéquat
    //Suivant le nombre de places on affiche ou non le paragraphe d'alerte
    if (this.places > 5) {
      this.price = this.price;
    } else if (this.places <= 5 && this.places > 2) {
      this.price = this.price * 1.5;
      this.cautionIsEnble = true;
    } else if (this.places <= 2) {
      this.price = this.price * 1.8;
      this.cautionIsEnble = true;
    }
  }
}
