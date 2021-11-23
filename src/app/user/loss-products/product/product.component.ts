import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { environment } from 'src/environments/environment';
import { restoreLossProductStart } from '../../state/user.actions';
import { getLossProductById } from '../../state/user.selectors';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-loss-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class LossProductComponent implements OnInit {

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
    private router: Router
  ) { }


  ngOnInit() {
    this.store.select(getLossProductById).subscribe(product => {
      this.product = product;
      if(this.product){
        this.product.imgs_urls.forEach(image => {
          this.sliderImages.push(this.fsUrl + image)
        });
      }

    });
  }

  restoreObject(){
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(restoreLossProductStart({id: this.product.id}));
    this.router.navigate(['/user/loss-products']);
  }

}
