import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { pantryItem } from '../interfaces/pantry.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init()
  }

  private _pantry: Subject<pantryItem[]> = new Subject<pantryItem[]>;
  public pantryObs = this._pantry.asObservable();



  async init() {
    await this.storage.create();
  }

  async addPantryItem(item: pantryItem): Promise<void> {
    await this.storage.set(item.uuid, item);
  }

  async getAllPantryItems(): Promise<pantryItem[]> {
    const keys = await this.storage.keys()
    const pantryItems: pantryItem[] = []

    if (keys) {
      for (const key of keys) {
        const item = await this.storage.get(key)
        if (item) {
          pantryItems.push(item)
        }
      }
    }
    this._pantry.next(pantryItems);
    return pantryItems;
  }

}
