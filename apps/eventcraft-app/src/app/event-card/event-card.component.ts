import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../state/event/event.model';
import { Store } from '@ngxs/store';
import { RemoveEvent } from '../state/event/event.actions';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  removeEvent(id) {
    this.store.dispatch(new RemoveEvent(id));
  }
}
