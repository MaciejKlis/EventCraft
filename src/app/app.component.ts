import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { CreateEvent } from './state/event/event.actions';
import { EventFactory } from './event-factory/eventFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store
  ){}

  ngOnInit() {
    for(let i = 0; i < 5; i++){
      this.store.dispatch(
        new CreateEvent(EventFactory.create())
      )
    }
  }
}
