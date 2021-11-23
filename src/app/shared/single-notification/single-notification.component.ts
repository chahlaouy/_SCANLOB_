import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { setLoadingSpinner } from '../store/shared.actions';
import { getNotificationsByID } from '../store/shared.selectors';

@Component({
  selector: 'app-single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.scss'],
})
export class SingleNotificationComponent implements OnInit {

  title: string = "الاشعارات";

  notification$: Observable<any>
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.notification$ = this.store.select(getNotificationsByID);
  }

}
