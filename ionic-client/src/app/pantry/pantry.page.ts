import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
// prettier-ignore
import {
  IonHeader, IonTitle, IonToolbar, IonContent, IonItem, IonThumbnail, IonLabel,
  IonList, IonButton, IonFab, IonFabButton, IonIcon
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { add, remove } from "ionicons/icons";
import { StorageService } from "../services/storage.service";
import { pantryItem } from "../interfaces/pantry.interface";
import { categories } from "./categories";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-pantry",
  templateUrl: "./pantry.page.html",
  styleUrls: ["./pantry.page.scss"],
  standalone: true,
  // prettier-ignore
  imports: [IonHeader, IonTitle, IonToolbar, IonContent, IonItem, IonThumbnail, IonLabel,
    IonList, IonButton, IonFab, IonFabButton, IonIcon, CommonModule, FormsModule,
    RouterLink
  ],
})
export class PantryPage implements OnInit {
  constructor() {
    addIcons({ add, remove });
  }

  private storageService = inject(StorageService);

  protected pantryCategories = categories;

  protected $pantryItems: Observable<pantryItem[]> = of([]);

  protected onUpdateQuantity(event: MouseEvent, item: pantryItem, flag: "minus" | "add") {
    event.stopPropagation();
    let newQuantity = 0;
    if (flag === "minus") {
      newQuantity = item.quantity - 1;
    } else if (flag === "add") {
      newQuantity = item.quantity + 1;
    }
    const updatedItem = { ...item, quantity: newQuantity };
    this.storageService.addPantryItem(updatedItem).then((_) => {
      this.storageService.getAllPantryItems();
    });
  }

  ngOnInit() {
    this.storageService.getAllPantryItems();
    this.$pantryItems = this.storageService.pantryObs;
  }
}
