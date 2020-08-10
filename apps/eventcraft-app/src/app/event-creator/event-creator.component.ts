import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CreateEvents } from '../state/event/event.actions';
import { Event } from '../state/event/event.model';
import { EventFactory } from '../event-factory/eventFactory';
import { EventState } from '../state/event/event.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent {
  constructor(
    private router: Router,
    private store: Store,
  ) { }

  event: Event;

  updatedEvent(event) {
    this.event = event;
    this.createEvent();
  }

  createEvent() {
    this.store.dispatch(
      new CreateEvents([this.event])
    ).subscribe(() => this.router.navigateByUrl('search'));
  }

  createRandom(amountOfElements: number) {
    let eventsArr = [];

    for (let i = 0; i < amountOfElements; i++) eventsArr[i] = EventFactory.create();

    this.store.dispatch(
      new CreateEvents(eventsArr)
    ).subscribe(() => this.router.navigateByUrl('search'));
  }
}
