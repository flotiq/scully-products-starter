import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import {Observable} from 'rxjs';
import {ProductList, ContentProductService} from 'flotiq';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private transferState: TransferStateService,
    private flotiqService: ContentProductService
  ) { }

  getProduct(slug): Observable<ProductList> {
    return this.transferState.useScullyTransferState(
      slug,
      this.flotiqService.listProduct(
        1,
        1,
        'id',
        'asc',
        0,
        '{"slug":{"type":"equals","filter":"' + slug + '"}}'
      )
    );
  }
}
