import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
// import { EchoService } from 'ngx-laravel-echo';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { getUserChatrooms } from 'src/app/user/state/user.selectors';
import { setLoadingSpinner } from '../../store/shared.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  chatrooms: any;
  constructor(
    private store: Store<AppState>,
    // private echoService: EchoService,
  ) { }

  ngOnInit() {
    this.store.select(getUserChatrooms).subscribe( chatrooms => {
      this.chatrooms = chatrooms;
    });
  }

  }
