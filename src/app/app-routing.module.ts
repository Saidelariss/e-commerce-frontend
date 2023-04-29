import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  
  {path:"admin",component : AdminTemplateComponent, canActivate : [AuthenticationGuard],
   children:[
    {path:"products",component : ProductsComponent},
    {path:"customers",component : CustomersComponent},
    {path:"newProduct",component : NewProductComponent},
    {path:"editProduct/:id",component : EditProductComponent}
  ]},
  {path:"login",component : LoginComponent},
  {path:"",component : LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
