import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton, 
  IonInput, 
  IonSelect, 
  IonSelectOption } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
  trash,
  checkmarkCircleOutline,
  cloudUploadOutline,
} from "ionicons/icons";
import {
  UntypedFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from "@angular/forms";
import { categories } from "../categories";
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from "src/app/services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pantry-item",
  templateUrl: "./pantry-item.component.html",
  styleUrls: ["./pantry-item.component.scss"],
  standalone: true,
  imports: [
    IonSelect,
    IonSelectOption,
    IonInput, 
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class PantryItemComponent implements OnInit {
  constructor() {
    addIcons({ trash, checkmarkCircleOutline, cloudUploadOutline });
  }

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  private storageService = inject(StorageService);

  private validExt = ["image/jpg", "image/jpeg", "image/png"];
  private maxSize: number = 5000000;
  private errors: Array<string> = [];
  protected preview: string | undefined = "";

  protected categories = categories;

  protected pantryItemForm = this.fb.group({
    uuid: [uuidv4()],
    name: ["", Validators.required],
    quantity: ["", Validators.required],
    minQuantity: ["", Validators.required],
    category: ["", Validators.required],
    img: [""]
  })

  onFileSelected(event: any) {
    this.errors = [];
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (file.size > this.maxSize) {
        this.errors = [
          ...this.errors,
          `Please select a photo with the size less than ${this.maxSize / 1000}MO`,
        ];
      }
      if (!this.errors?.length) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.pantryItemForm.patchValue({
            img: reader.result?.toString(),
          });
          this.preview = reader.result?.toString();
        };
      }
    }
  }

  protected saveItem() {
    if (this.pantryItemForm) {
      this.storageService.addPantryItem(this.pantryItemForm.value).then(_ => {
        this.storageService.getAllPantryItems();
      })
      this.pantryItemForm.reset();
      this.router.navigateByUrl("tabs/pantry");
    }
  }

  ngOnInit() {}
}
