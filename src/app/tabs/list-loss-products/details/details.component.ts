import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoService } from 'ngx-laravel-echo';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { User } from 'src/app/models/user.model';
import {
  addCommentStart,
  addCommentSuccess,
  putProductComments,
  setLoadingSpinner,
} from 'src/app/shared/store/shared.actions';
import { getLatestLossProductByID, getProductComments } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  body: any;
  sliderImages: any[] = [];

  sliderOptions = {
    autoplay: {
      delay: 2000,
    },
    loop: true,
  };

  product: any;
  fsUrl: any = environment.BACK_END_FILES;
  authUser: any;
  comments: any;
  constructor(
    private echoService: EchoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(getLatestLossProductByID).subscribe((pro) => {
      this.product = pro;
      if (this.product) {
        this.product.product.imgs_urls.forEach((image) => {
          this.sliderImages.push(this.fsUrl + image);
        });
        this.store.dispatch(
          putProductComments({ comments: this.product.comments })
        );

      }
    });
    this.store.select(getProductComments).subscribe(comments => {
      this.comments = comments
    })
    this.store.select(getAuthenticatedUser).subscribe((user) => {
      this.authUser = user.user;
    });

    this.echoService
      .join(`loss-product.${this.product.id}`, 'public')
      .listen(`loss-product.${this.product.id}`, 'NewComment')
      .subscribe((comment) => {
        console.log(comment.comment);
        this.store.dispatch(addCommentSuccess({comment: comment}));
      });
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
}
