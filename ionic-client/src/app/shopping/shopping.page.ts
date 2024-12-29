import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// prettier-ignore
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { StorageService } from "../services/storage.service";
import { Observable, of } from "rxjs";
import { pantryItem } from "../interfaces/pantry.interface";

@Component({
  selector: "app-shopping",
  templateUrl: "./shopping.page.html",
  styleUrls: ["./shopping.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class ShoppingPage implements OnInit {
  constructor() { }

  private storageService = inject(StorageService);

  protected $pantryItemsToBuy: Observable<pantryItem[]> = of([]);

  ngOnInit() {
    this.storageService.getItemsUnderStock();
    this.$pantryItemsToBuy = this.storageService.pantryToBuyObs;
  }
}
