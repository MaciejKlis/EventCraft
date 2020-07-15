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

  lastId: string;
  event: Event = {
    name: "",
    description: "",
    organizer: "",
    localization: {
      city: "",
      lat: 0,
      lng: 0
    },
    startAt: new Date(),
    endAt: new Date(),
    type: "",
    imageUrl: "",
  }

  private actionSubscription: Subscription;

  updatedEvent(event) {
    this.event = event;
    this.createEvent();
  }

  createEvent() {
    this.store.dispatch(
      new CreateEvents([this.event])
    )
  }

  createRandom(amountOfElements: number) {
    let eventsArr = [];

    for (let i = 0; i < amountOfElements; i++) {
      eventsArr[i] = EventFactory.create();
    }

    this.store.dispatch(
      new CreateEvents(eventsArr)
    ).subscribe(events => {
      events.length === 1 ? this.router.navigateByUrl('/event/' + events[0]._id) : this.router.navigateByUrl('search');
    })
  }
}
