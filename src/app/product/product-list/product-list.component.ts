import {Component, OnInit} from '@angular/core';
import {ContentProductService, Product, Media, ContentMediaService} from 'flotiq';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductListService} from './product-list.service';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  images: Media[];
  totalPages: number;
  page: number;

  constructor(
    private flotiqService: ContentProductService,
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductListService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.page = +params.page || 1;
      this.productService.getProducts(this.page).subscribe((products) => {
        if(products) {
          this.products = products.data;
          this.totalPages = products.total_pages;
          this.page = products.current_page;
          this.images = [];
          this.products.forEach(post => {
            if (post.productImage && post.productImage[0]) {
              this.imageService.getImage(post.productImage[0].dataUrl.split('/')[5]).subscribe((image) => {
                this.images[post.id] = image;
              });
            }
          });
        }
      });
    });
  }

}
