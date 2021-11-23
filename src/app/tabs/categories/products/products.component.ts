import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSubcategory } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  subCategory$: Observable<any>;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subCategory$ = this.store.select(getSubcategory);
  }

}
