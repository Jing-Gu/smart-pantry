import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
// import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
// prettier-ignore
import {
  IonIcon, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton,
  IonInput, IonSelect, IonSelectOption
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { trash, checkmarkCircleOutline, imageOutline } from "ionicons/icons";
import { UntypedFormBuilder, ReactiveFormsModule, Validators, FormGroup } from "@angular/forms";
import { categories } from "../categories";
import { v4 as uuidv4 } from "uuid";
import { StorageService } from "src/app/services/storage.service";
import { map, switchMap } from "rxjs";
import { pantryItem } from "src/app/interfaces/pantry.interface";

@Component({
  selector: "app-pantry-item",
  templateUrl: "./pantry-item.component.html",
  styleUrls: ["./pantry-item.component.scss"],
  standalone: true,
  // prettier-ignore
  imports: [IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonContent,
    IonHeader, IonToolbar, IonButtons, IonBackButton, CommonModule, ReactiveFormsModule,
  ],
})
export class PantryItemComponent implements OnInit {
  constructor() {
    addIcons({ trash, checkmarkCircleOutline, imageOutline });
  }

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private storageService = inject(StorageService);

  private validExt = ["image/jpg", "image/jpeg", "image/png"];
  private maxSize: number = 5000000;
  private errors: Array<string> = [];
  protected preview: string | undefined = "";

  protected categories = categories;
  protected imgUploadBase64: Uint8Array | undefined;
  protected imageSize: string = "";

  protected uuid = "";

  protected pantryItemForm = this.fb.group({
    uuid: [uuidv4()],
    name: ["", Validators.required],
    quantity: ["", Validators.required],
    minQuantity: ["", Validators.required],
    category: ["", Validators.required],
    img: [""],
    under_stock: [false],
  });

  private setFormValues(item: pantryItem | null) {
    if (item) {
      this.pantryItemForm.setValue({
        uuid: item.uuid,
        name: item.name,
        quantity: item.quantity,
        minQuantity: item.minQuantity,
        category: item.category,
        img: item.img,
        under_stock: item.under_stock,
      });
      this.preview = item.img;
    }
  }

  // async takePhoto() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       resultType: CameraResultType.Uri, // You can also use CameraResultType.Base64
  //       source: CameraSource.Prompt, // Open the camera or select from album
  //       quality: 90, // Adjust photo quality (0-100)
  //     });

  //     // The image web path contains the local URL of the photo
  //     this.preview = image.webPath;

  //     // For base64 encoded image, you can access it like this:
  //     // this.photo = 'data:image/jpeg;base64,' + image.base64String;
  //   } catch (error) {
  //     console.error("Error taking photo:", error);
  //   }
  // }

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
    if (this.pantryItemForm?.valid) {
      const formValue = this.pantryItemForm.value;
      formValue.under_stock = formValue.quantity < formValue.minQuantity;
      this.storageService.addPantryItem(formValue).then((_) => {
        this.storageService.getAllPantryItems();
      });
      this.pantryItemForm.reset();
      this.router.navigateByUrl("tabs/pantry");
    }
  }

  protected deleteItem() {
    if (this.uuid) {
      this.storageService.deletePantryItem(this.uuid).then((_) => {
        this.storageService.getAllPantryItems();
      });
      this.pantryItemForm.reset();
      this.router.navigateByUrl("tabs/pantry");
    }
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => (this.uuid = params["uuid"])),
        switchMap((uuid) => this.storageService.getPantryItemByUuid(uuid)),
      )
      .subscribe((item) => this.setFormValues(item));
  }
}
