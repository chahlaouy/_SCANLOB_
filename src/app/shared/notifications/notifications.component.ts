import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { cleartNotifications, loadMoreNotificationsStart, setLoadingSpinner} from '../store/shared.actions';
import { getAllNotifications, getAllNotificationsNumber } from '../store/shared.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  title: string = "الاشعارات";
  notifications$ : Observable<any>;
  allNotificationsNumber : any;
  page: number = 1;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(loadMoreNotificationsStart({page: this.page}))
    this.notifications$ = this.store.select(getAllNotifications);
    this.store.select(getAllNotificationsNumber).subscribe(number => {
      this.allNotificationsNumber = number;
    });
  }

  loadMoreData(ev: any){
    // ev.target.complete();
    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.allNotificationsNumber.length % 2 !== 0) {
      ev.target.disabled = true;
      this.toggleInfiniteScroll();

    }else{
      this.store.dispatch(loadMoreNotificationsStart({page: this.page +1 }))
      this.page = this.page + 1;
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnDestroy(){
    this.store.dispatch(cleartNotifications());
  }

}
