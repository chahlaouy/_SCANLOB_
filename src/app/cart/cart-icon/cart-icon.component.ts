import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCartItemsNumber } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent implements OnInit {

  number: number = 0;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.select(getCartItemsNumber).subscribe(num => {
      this.number = num
    })
  }

}
