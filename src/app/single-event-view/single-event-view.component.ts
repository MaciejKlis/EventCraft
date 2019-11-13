import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-single-event-view',
  templateUrl: './single-event-view.component.html',
  styleUrls: ['./single-event-view.component.scss']
})
export class SingleEventViewComponent implements OnInit {

  @Select(EventState.events) events$: Observable<Event[]>;

  constructor(
    private route: ActivatedRoute
  ) { }

  id: string;
  event: Event;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.events$.subscribe(events => {
      events.forEach(event => {
        if(event.id == this.id) this.event = event;
      })
    })
  }
}
