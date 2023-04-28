import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';

//un module est une classe qui utilise le décorateur @NgModule
@NgModule({
  declarations: [ //déclarer tous les composants de ce module
    AppComponent,
    ProductsComponent,
    CustomersComponent
  ],
  imports: [ //importer les modules 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [], //déclarer les services (pour les service racine ce n'est pas la peine de le faire)
  bootstrap: [AppComponent] //ce module lorsque il va charger quel est le composant qui va etre chargé en premier
})
export class AppModule { }
