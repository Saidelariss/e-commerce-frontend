import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

//un module est une classe qui utilise le décorateur @NgModule
@NgModule({
  declarations: [ //déclarer tous les composants de ce module
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    LoginComponent,
    AdminTemplateComponent,
    NewProductComponent,
    EditProductComponent
  ],
  imports: [ //importer les modules 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [], //déclarer les services (pour les service racine ce n'est pas la peine de le faire)
  bootstrap: [AppComponent] //ce module lorsque il va être chargé, quel est le composant qui va etre chargé en premier, c'est AppComponent
})
export class AppModule { }
