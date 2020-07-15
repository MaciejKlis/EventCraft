import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { UpdateEvent } from '../state/event/event.actions';

@Component({
  selector: 'app-single-event-edit',
  templateUrl: './single-event-edit.component.html',
  styleUrls: ['./single-event-edit.component.scss']
})
export class SingleEventEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private actions$: Actions) { }

  @Select(EventState.events) events$: Observable<Event[]>

  eventIsLoaded = false;
  event: Event = <Event>{
    _id: '',
    name: '',
    description: '',
    organizer: '',
    localization: {
      city: '',
      lat: 0,
      lng: 0,
    },
    startAt: new Date(),
    endAt: new Date(),
    type: '',
    imageUrl: '',
  }

  ngOnInit() {
    this.event._id = this.route.snapshot.paramMap.get('id');

    this.events$
      .pipe(map(events => events.filter(eve => eve._id === this.event._id)[0]))
      .subscribe(event => {
        if (event !== undefined) {
          this.event = event;
          this.event.startAt = new Date(this.event.startAt);
          this.event.endAt = new Date(this.event.endAt);
          this.eventIsLoaded = true;
        }
      })

    this.actions$.pipe(ofActionSuccessful(UpdateEvent)).subscribe((ev) => {
      this.router.navigateByUrl('/event/' + ev.event._id)
    })
  }

  updateEvent(event): void {
    this.event = event;
    console.log(this.event)
    this.store.dispatch(new UpdateEvent(this.event));
  }
}
