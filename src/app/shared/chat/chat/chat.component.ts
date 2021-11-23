import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { setLoadingSpinner } from '../../store/shared.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  title: string = "الرسائل";
  requests$: Observable<any>;
  allReqNumber: number;
  page: number = 1;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

  }

  loadMoreData(ev: any){
    // ev.target.complete();
    // App logic to determine if all data is loaded
    // and disable the infinite scroll
  //   if (this.allReqNumber % 2 !== 0) {
  //     ev.target.disabled = true;
  //     this.toggleInfiniteScroll();

  //   }else{
  //     this.store.dispatch(getRequestsStart({page: this.page +1 }))
  //     this.page = this.page + 1;
  //   }
  // }

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  //   this.infiniteScroll.disabled = true;
  // }

  // ngOnDestroy(){
  //   this.store.dispatch(clearRequests());
  }

}
