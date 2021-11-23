import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { sendMessageStart, setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.scss'],
})
export class SingleChatComponent implements OnInit {


  messages$: Observable<any>;
  authUser: any;
  request: any;
  body: string;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

  }

  sendMessage(){
    console.log(this.body)
    if (this.body.length == 0 ){
      return;
    }
    this.store.dispatch(sendMessageStart({body: this.body, id: this.request.id}))
  }

}
