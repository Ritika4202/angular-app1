import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import{FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms'
import { AddProductsComponent } from './add-products/add-products.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
