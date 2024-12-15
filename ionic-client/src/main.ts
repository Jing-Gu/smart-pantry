import { bootstrapApplication } from "@angular/platform-browser";
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from "@angular/router";
import { IonicModule } from '@ionic/angular';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from "@ionic/angular/standalone";
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";

const ionicStorageProviders = IonicStorageModule.forRoot({
  name: '_pantry_db',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
}).providers

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: IonicModule, useValue: IonicModule.forRoot() },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    ...(ionicStorageProviders || [])
  ],
});
