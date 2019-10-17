import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss']
})
export class EventsViewComponent implements OnInit {
  
  @Select(EventState.events) events$: Observable<Event[]>;

  constructor() { }

  ngOnInit() {
  }
}
