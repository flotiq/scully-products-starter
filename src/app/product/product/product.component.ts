import {Component, OnInit} from '@angular/core';
import {ContentProductService, Product, Media} from 'flotiq';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from './product.service';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-product-post',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Product;
  slug: string;
  images: Media[];
  image: Media;

  constructor(
    private flotiqService: ContentProductService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.productService.getProduct(this.slug).subscribe((product) => {
        if(product) {
          this.product = product.data[0];
          this.images = [];
          if (this.product.productGallery) {
            this.product.productGallery.forEach(galleryImage => {
              this.imageService.getImage(galleryImage.dataUrl.split('/')[5]).subscribe((image) => {
                this.images.push(image);
              });
            })
          }
          if (this.product.productImage && this.product.productImage[0]) {
            this.imageService.getImage(this.product.productImage[0].dataUrl.split('/')[5]).subscribe((image) => {
              this.image = image;
            });
          }
        }
      });
    });
  }

}
