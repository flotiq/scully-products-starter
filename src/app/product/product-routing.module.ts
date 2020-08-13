import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SingleProductComponent} from './product/product.component';
import {ProductListComponent} from './product-list/product-list.component';

const routes = [
  { path: '', component: ProductListComponent },
  { path: ':page', component: ProductListComponent },
  { path: 'product/:slug', component: SingleProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
