import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/auth/state/auth.selectors';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { sendMessageStart, setUserMessages } from 'src/app/user/state/user.actions';
import { selectSingleChatroom, selectUserMessages } from 'src/app/user/state/user.selectors';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.scss'],
})
export class SingleChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages$: Observable<any>;
  authUser: any;
  chatroom: any;
  body: string;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.select(selectSingleChatroom).subscribe(chatroom => {
      this.chatroom = chatroom;
      this.cdr.detectChanges();
      this.scrollToBottom();
      if(chatroom){
        this.store.dispatch(setUserMessages({messages: chatroom.messages}));
      }
    });

    this.messages$ = this.store.select(selectUserMessages);
    this.store.select(getAuthenticatedUser).subscribe(user => {
      this.authUser = user
    })
  }

  sendMessage(){
    if (this.body.length == 0 ){
      return;
    }
    this.store.dispatch(sendMessageStart({body: this.body, id: this.chatroom.id}));
    this.body = "";
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
