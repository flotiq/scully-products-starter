import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import {Observable} from 'rxjs';
import {ProductList, ContentProductService} from 'flotiq';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(
    private transferState: TransferStateService,
    private flotiqService: ContentProductService
  ) { }

  getProducts(page): Observable<ProductList> {
    return this.transferState.useScullyTransferState(
      'products' + page,
      this.flotiqService.listProduct(page, 8, 'internal.createdAt', 'desc')
    );
  }
}
