import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { getCartTotalPrice } from '../shared/store/shared.selectors';
import { getAuthenticatedUser } from '../auth/state/auth.selectors';

declare var Stripe: stripe.StripeStatic;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {

  @ViewChild('cardElement') cardElement: ElementRef;
  addCardForm: any = FormGroup;
  stripe: stripe.Stripe;
  card: any;
  cardErrors: any;
  billingInfo = {
    total: 0,
    totalTTC: 0,
    email: "",
    phone: "",
    zip: 0,
    country: "",
    city: "",

  }
  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.store.select(getCartTotalPrice).subscribe( total => {
      this.billingInfo.total = total;
      this.billingInfo.totalTTC = ((this.billingInfo.total * 20)/100 ) + this.billingInfo.total;
    })
    this.store.select(getAuthenticatedUser).subscribe( user => {
      this.billingInfo.city = user.user.userCity;
      this.billingInfo.country = user.user.userCountry;
      this.billingInfo.zip = user.user.userZip;
      this.billingInfo.phone = user.user.userPhone;
      this.billingInfo.email = user.user.userEmail;
    })
    this.stripe = Stripe("pk_test_51HlQt5AOYmkBFRPiobK1xcueD7vOxqorJIPLnNXmQs8rY3Vydcg5szMTfh9XmbI6KrIZeQ5P5q3wt0Op6D96yDQ7009arhI3sB");

  }
  ngAfterViewInit(){
    const elements = this.stripe.elements();
    this.card = elements.create("card");
    this.card.mount(this.cardElement.nativeElement);
    this.card.addEventListener("change", ({error}) => {
      this.cardErrors = error && error.message
    });
  }

  async handleForm(e){
    e.preventDefault();

    const {source, error} = await this.stripe.createSource(this.card);

    if(error){
      const cardErrors = error.message
    }else{
      //call to back end
    }
  }
}
