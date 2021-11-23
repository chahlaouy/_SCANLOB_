import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { setErrorMessage } from '../../store/shared.actions';

@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent implements OnInit {

  @Input() errorMessage: any;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {}
  closeErrorMessagesDialog(){
    this.store.dispatch(setErrorMessage({errorMessage: null}));
  }

}
