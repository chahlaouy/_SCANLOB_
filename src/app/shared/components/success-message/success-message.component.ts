import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { setSuccessMessage } from '../../store/shared.actions';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss'],
})
export class SuccessMessageComponent implements OnInit {

  @Input() successMessage: any;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  closeSuccessMessageDialog(){
    this.store.dispatch(setSuccessMessage({successMessage: null}));
  }
}
