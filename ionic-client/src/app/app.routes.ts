import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./tabs/tabs.routes").then((m) => m.routes),
  },
  {
    path: "pantry",
    loadComponent: () => import("./pantry/pantry.page").then((m) => m.PantryPage),
  },
  {
    path: "shopping",
    loadComponent: () => import("./shopping/shopping.page").then((m) => m.ShoppingPage),
  },
];
