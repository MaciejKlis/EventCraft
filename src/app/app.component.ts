import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventState } from './state/event/event.state';
import { Event } from './state/event/event.model';
import { CreateEvent } from './state/event/event.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private id = 0;

  @Select(EventState.events) events$: Observable<Event[]>;
  
  constructor(
    private store: Store
  ) { }

  createEvent() {
    console.log(this.events$)
    this.id += 1;
    this.store.dispatch(new CreateEvent({ id: this.id, name: `Event #${this.id}`}));
  }
}
