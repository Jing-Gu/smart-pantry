export interface pantryItem {
  uuid: string;
  name: string;
  quantity: number;
  minQuantity: number;
  category: string;
  img: string;
  under_stock: boolean;
}
