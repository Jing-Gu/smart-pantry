import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonIcon,
  IonFabButton,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { add } from "ionicons/icons";

@Component({
  selector: "app-pantry",
  templateUrl: "./pantry.page.html",
  styleUrls: ["./pantry.page.scss"],
  standalone: true,
  imports: [
    IonFabButton,
    IonIcon,
    IonFab,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class PantryPage implements OnInit {
  constructor() {
    addIcons({ add });
  }

  ngOnInit() {}
}
