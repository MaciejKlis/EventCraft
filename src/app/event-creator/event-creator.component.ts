import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Actions, ofActionDispatched, Select } from '@ngxs/store';
import { debounceTime, switchMap, debounce} from 'rxjs/operators';
import { CreateEvent } from '../state/event/event.actions';
import { EventFactory } from '../event-factory/eventFactory';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { empty, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})

export class EventCreatorComponent implements OnInit, OnDestroy{
  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions,
  ) {}

  types = [
    {label: 'Conference', value: 'conference', icon: 'pi pi-comments'},
    {label: 'Golf Event', value: 'golfEvents', icon: 'pi pi-shopping-cart'},
    {label: 'Theme Party', value: 'themeParties', icon: 'pi pi-eye'},
    {label: 'Wedding', value: 'wedding', icon: 'pi pi-video'},
    {label: 'Birthday', value: 'birthday', icon: 'pi pi-unlock'},
  ];

  eventName: string;
  eventDescription: string;
  eventOrganizer: string;
  eventLocalization: string;
  eventStart: Date;
  eventEnd: Date;
  eventType: string;
  eventImage: string;

  @Select(EventState.events) events$: Observable<Event[]>;
  
  lastId:string;
  
  private eventSubscription: Subscription;
  private actionSubscription: Subscription;

  ngOnInit() {
    this.actionSubscription = this.actions$.pipe(
      ofActionDispatched(CreateEvent),
      debounceTime(300),
      switchMap( ()=>{
        return this.store.select(EventState.events)
      })
    ).subscribe(ev=>{
      this.router.navigateByUrl('/event/' + ev[ev.length - 1].id )
    })
  }
  
  ngOnDestroy(){
    this.actionSubscription.unsubscribe();
  }

  createEvent(){
    this.store.dispatch(
      new CreateEvent({ 
        id: "dasdas",
        name: this.eventName,
        description: this.eventDescription,
        organizer: this.eventOrganizer,
        localization: this.eventLocalization,
        startAt: this.eventStart,
        endAt: this.eventEnd,
        type: this.eventType,
        imageUrl: this.eventImage,
        createdAt: new Date,
      })
    )
  }


  createRandom(){
    this.store.dispatch(
      new CreateEvent(EventFactory.create())  
    )
  }
}
