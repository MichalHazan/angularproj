import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpComponent } from './comps/addp/addp.component';
import { AdminProductsComponent } from './comps/admin-products/admin-products.component';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/login/login.component';
import { OrderComponent } from './comps/order/order.component';
import { ProductsListComponent } from './comps/products-list/products-list.component';
import { RegisterComponent } from './comps/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: 'add', component: AddpComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
