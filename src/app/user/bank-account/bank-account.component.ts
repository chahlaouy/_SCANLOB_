import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { setBankAccountStart } from '../state/user.actions';
import { getAccount } from '../state/user.selectors';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent implements OnInit {

  account: any = null;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(getAccount).subscribe(account => {
      if(account){
        this.account = account.account
      }
    });
  }

  setBankAccount(){

    if(!this.account){
      this.store.dispatch(setErrorMessage({errorMessage:
        {error: "veuillez remplir le champs compte bancaire"}
      }));
      return;

    }
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(setBankAccountStart({account: this.account}))
  }
}
