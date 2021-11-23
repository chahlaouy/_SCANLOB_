import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
})
export class NotificationIconComponent implements OnInit {

  number: number = 2;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

  }

}
