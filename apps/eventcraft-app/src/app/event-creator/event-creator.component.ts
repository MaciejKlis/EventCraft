import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CreateEvent } from '../state/event/event.actions';
import { Event } from '../state/event/event.model';
import { EventFactory } from '../event-factory/eventFactory';
import { EventState } from '../state/event/event.state';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})

export class EventCreatorComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions,
  ) { }

  lastId: string;
  event: Event = {
    id: "",
    name: "",
    description: "",
    organizer: "",
    localization: "",
    startAt: new Date(),
    endAt: new Date(),
    type: "",
    imageUrl: "",
    createdAt: new Date(),
  }

  private actionSubscription: Subscription;

  ngOnInit() {
    this.actionSubscription = this.actions$.pipe(
      ofActionDispatched(CreateEvent),
      debounceTime(300),
      switchMap(() => {
        return this.store.select(EventState.events)
      })
    ).subscribe(ev => {
      this.router.navigateByUrl('/event/' + ev[ev.length - 1].id)
    })
  }

  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }

  updatedEvent(event) {
    this.event = event;
    this.createEvent();
  }

  createEvent() {
    this.store.dispatch(
      new CreateEvent(this.event)
    )
  }


  createRandom() {
    this.store.dispatch(
      new CreateEvent(EventFactory.create())
    )
  }
}
