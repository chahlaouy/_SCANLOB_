import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { toggleSellableStart } from 'src/app/user/state/user.actions';

@Component({
  selector: 'app-modal-price',
  templateUrl: './modal-price.component.html',
  styleUrls: ['./modal-price.component.scss'],
})
export class ModalPriceComponent implements OnInit {

  @Input() productId: number;
  price: any;
  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

  }

  toggleSellable(){
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(toggleSellableStart({id: this.productId, price: this.price}));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
