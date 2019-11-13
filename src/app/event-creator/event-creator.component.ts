import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateEvent } from '../state/event/event.actions';
import { EventFactory } from '../event-factory/eventFactory';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})

export class EventCreatorComponent implements OnInit{
  constructor(
    private store: Store
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
  
  ngOnInit() {}
  
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
      })  
    );
  }

  createRandom(){
    this.store.dispatch(
      new CreateEvent(EventFactory.create())  
    );
  }
}
