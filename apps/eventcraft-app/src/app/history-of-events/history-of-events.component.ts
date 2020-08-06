import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../state/event/events.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../state/event/event.model';

@Component({
  selector: 'app-history-of-events',
  templateUrl: './history-of-events.component.html',
  styleUrls: ['./history-of-events.component.scss']
})
export class HistoryOfEventsComponent implements OnInit {

  constructor(private eventsService: EventsService) { }
  amountOfEventsOnOnePage = 9;
  events$: Observable<{ amountOfRemoved: number, events: Event[] }>;

  totalRemovedEvents: number;
  isEventsHistoryFetched = false;

  getNextPage(numberOfNextPage: number) {
    this.events$ = this.eventsService.getPageOfRemovedEvents(numberOfNextPage, this.amountOfEventsOnOnePage)
      .pipe(map(results => {
        this.totalRemovedEvents = results[0];
        this.isEventsHistoryFetched = true;
        return results[1];
      }))
  }

  ngOnInit(): void {
    this.getNextPage(1);
  }
}
