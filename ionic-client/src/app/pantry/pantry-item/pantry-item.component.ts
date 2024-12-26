import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
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
  IonSelectOption,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { trash, checkmarkCircleOutline, cloudUploadOutline } from "ionicons/icons";
import { UntypedFormBuilder, ReactiveFormsModule, Validators, FormGroup } from "@angular/forms";
import { categories } from "../categories";
import { v4 as uuidv4 } from "uuid";
import { StorageService } from "src/app/services/storage.service";

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
    ReactiveFormsModule,
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
  protected imgUploadBase64: Uint8Array | undefined;
  protected imageSize: string = "";

  //protected photo: string | undefined;

  protected pantryItemForm = this.fb.group({
    uuid: [uuidv4()],
    name: ["", Validators.required],
    quantity: ["", Validators.required],
    minQuantity: ["", Validators.required],
    category: ["", Validators.required],
    img: [""],
  });

  async takePhoto() {
    try {
      // Mock implementation for browser environment
      if (window.location.hostname === "localhost") {
        this.preview = "https://placehold.co/600x400";
      } else {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri, // You can also use CameraResultType.Base64
          source: CameraSource.Camera, // Open the camera
          quality: 90, // Adjust photo quality (0-100)
        });

        // The image web path contains the local URL of the photo
        this.preview = image.webPath;

        // For base64 encoded image, you can access it like this:
        // this.photo = 'data:image/jpeg;base64,' + image.base64String;

        console.log("Photo taken:", this.preview);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  }

  async onFileSelected(event: any) {
    this.errors = [];
    let reader = new FileReader();
    const imageFile = event.target.files[0];
    this.imageSize = `${(imageFile.size / 1024).toFixed(2)} KB`;
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (file.size > this.maxSize) {
        this.errors = [
          ...this.errors,
          `Please select a photo with the size less than ${this.maxSize / 1000}MO`,
        ];
      }
      if (!this.errors?.length) {
        reader.onload = () => {
          this.imgUploadBase64 = reader.result as Uint8Array;
          this.pantryItemForm.patchValue({
            img: this.imgUploadBase64,
          });
          this.preview = reader.result?.toString();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  protected saveItem() {
    if (this.pantryItemForm) {
      this.storageService.addPantryItem(this.pantryItemForm.value).then((_) => {
        this.storageService.getAllPantryItems();
      });
      this.pantryItemForm.reset();
      this.router.navigateByUrl("tabs/pantry");
    }
  }

  ngOnInit() {}
}
