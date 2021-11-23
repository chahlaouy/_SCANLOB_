import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { getProductById } from '../../state/user.selectors';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  sliderImages: any[] = [];

  sliderOptions = {
      autoplay: {
          delay: 2000
      },
      loop: true
  }
  fsUrl: any = environment.BACK_END_FILES;
  product: any;

  constructor(
    private store: Store<UserState>,
  ) { }


  ngOnInit() {
    this.store.select(getProductById).subscribe(product => {
      this.product = product;
      this.product.imgs_urls.forEach(image => {
        this.sliderImages.push(this.fsUrl + image)
      });

    });
  }



}
