import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { addCommentStart, addFoundProductStart, addProductToCart, putProductComments, setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { getCartItems, getProductById, getProductComments, getSubcategoryProduct } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  authUser: any;
  body: any;
  product$: Observable<any>;
  product: any;
  fsUrl: any = environment.BACK_END_FILES;
  items: any;
  comments: any;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.select(getSubcategoryProduct).subscribe(product => {
      this.product = product;
      if (this.product) {

        this.store.dispatch(
          putProductComments({ comments: this.product.comments })
        );

      }
    });
    this.store.select(getProductComments).subscribe(comments => {
      this.comments = comments
    });
    this.store.select(getCartItems).subscribe(items => {
      this.items = items;
    });
    this.store.select(getAuthenticatedUser).subscribe((user) => {
      this.authUser = user;
    });
  }

  addProductToCart(product){
    const item = this.items.find(item => item.id === product.id);
    if(item){
      return;
    }
    this.store.dispatch(addProductToCart({product}));
  }

  addComment() {
    if (!this.body) {
      return;
    }
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(
      addCommentStart({
        body: this.body,
        product_id: this.product.id,
      })
    );
    this.body = '';
  }

  contactUser(){
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(addFoundProductStart({
      productUuid: this.product.user_id,
      location: "NULL",
      status: "CONATCT_USER"
    }));
  }

}
