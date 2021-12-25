import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { environment } from 'src/environments/environment';
import { toggleSellableStart } from '../../state/user.actions';
import { getAccount, getProductById } from '../../state/user.selectors';
import { UserState } from '../../state/user.state';
import { ModalPriceComponent } from './modal-price/modal-price.component';

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
  account: any = null;
  isSellable: any = false;
  constructor(
    private store: Store<UserState>,
    public modalController: ModalController
  ) { }


  ngOnInit() {
    this.store.select(getProductById).subscribe(product => {
      this.product = product;
      if(!this.product.is_sellable){
        this.isSellable = false
      }else{
        this.isSellable = true;
      }
      this.product.imgs_urls.forEach(image => {
        this.sliderImages.push(this.fsUrl + image);
      });
    });
    this.store.select(getAccount).subscribe(account => {
      this.account = account;
    })

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPriceComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'productId': this.product.id,
      }
    });

    return await modal.present();
  }
  toggleSellable(){

    if(!this.account){
      this.store.dispatch(setErrorMessage({errorMessage: {
        error: "Veuillez ajouter un compte bancaire dans votre parametres de profile"
      }}));
      this.isSellable = null;
      return;
    }
    this.presentModal();

  }

  removeSellable(){
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(toggleSellableStart({id: this.product.id, price: 0}));
  }



}
