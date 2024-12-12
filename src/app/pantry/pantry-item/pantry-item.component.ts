import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton, IonInput, IonTextarea } from "@ionic/angular/standalone";
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
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-pantry-item",
  templateUrl: "./pantry-item.component.html",
  styleUrls: ["./pantry-item.component.scss"],
  standalone: true,
  imports: [IonInput, 
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

  private validExt = ["image/jpg", "image/jpeg", "image/png"];
  private maxSize: number = 5000000;
  private errors: Array<string> = [];
  protected preview: string | undefined = "";

  protected pantryItemForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    quantity: ["", Validators.required],
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

  }

  ngOnInit() {}
}
