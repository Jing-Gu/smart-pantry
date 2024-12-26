import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
//import { IonicModule } from '@ionic/angular';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonList,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { add, remove } from "ionicons/icons";
import { StorageService } from "../services/storage.service";
import { pantryItem } from "../interfaces/pantry.interface";

@Component({
  selector: "app-pantry",
  templateUrl: "./pantry.page.html",
  styleUrls: ["./pantry.page.scss"],
  standalone: true,
  imports: [
    //IonicModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonList,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class PantryPage implements OnInit {
  constructor() {
    addIcons({ add, remove });
  }

  private storageService = inject(StorageService);

  protected pantryItems: pantryItem[] = [];

  ngOnInit() {
    this.storageService.getAllPantryItems();

    this.storageService.pantryObs.subscribe((items) => {
      this.pantryItems = items;
      console.log(items);
    });
  }
}
