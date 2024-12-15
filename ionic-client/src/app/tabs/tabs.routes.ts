import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { PantryPage } from "../pantry/pantry.page";
import { ShoppingPage } from "../shopping/shopping.page";
import { PantryItemComponent } from "../pantry/pantry-item/pantry-item.component";

export const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "pantry",
        children: [
          {
            path: "",
            component: PantryPage,
          },
          {
            path: "add",
            component: PantryItemComponent,
          },
        ],
      },
      {
        path: "shopping",
        component: ShoppingPage,
      },
      {
        path: "",
        redirectTo: "/tabs/pantry",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/pantry",
    pathMatch: "full",
  },
];