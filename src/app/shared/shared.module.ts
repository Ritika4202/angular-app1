import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [
    ViewproductsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[CommonModule,FormsModule]
})
export class SharedModule { }
