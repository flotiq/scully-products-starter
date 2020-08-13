import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import {Observable} from 'rxjs';
import {ContentMediaService, Media} from 'flotiq';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private transferState: TransferStateService,
    private flotiqService: ContentMediaService
  ) { }

  getImage(id): Observable<Media> {
    return this.transferState.useScullyTransferState(
      id,
      this.flotiqService.getMedia(id)
    );
  }
}
