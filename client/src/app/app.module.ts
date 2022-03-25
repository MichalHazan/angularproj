import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './comps/products-list/products-list.component';
import { HeaderComponent } from './comps/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// --Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AddpComponent } from './comps/addp/addp.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/login/login.component';
import { RegisterComponent } from './comps/register/register.component';
import { AdminComponent } from './comps/admin/admin.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AfterLoginComponent } from './comps/after-login/after-login.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { OrderComponent } from './comps/order/order.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOrderComponent } from './comps/dialog-order/dialog-order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { AdminProductsComponent } from './comps/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    HeaderComponent,
    AddpComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AfterLoginComponent,
    OrderComponent,
    DialogOrderComponent,
    SearchPipePipe,
    AdminProductsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatSidenavModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
