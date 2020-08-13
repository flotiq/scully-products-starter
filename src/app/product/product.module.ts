import { NgModule } from '@angular/core';
import {ProductComponent} from './product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SingleProductComponent} from './product/product.component';
import {ProductRoutingModule} from './product-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductComponent,
    ProductRoutingModule,
    ProductListComponent
  ]
})
export class ProductModule {}
