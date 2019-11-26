import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-single-event-view',
  templateUrl: './single-event-view.component.html',
  styleUrls: ['./single-event-view.component.scss']
})
export class SingleEventViewComponent implements OnInit {

  @Select(EventState.events) events$: Observable<Event[]>;
  timeToStart:string

  constructor(
    private route: ActivatedRoute
  ) { }
  
  id: string;
  event: Event;

  dhms(t) {
    let days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.events$.subscribe(events => {
      events.forEach(event => {
        if(event.id == this.id) this.event = event;
      })
    })


    let date = new Date(this.event.startAt)

    interval(1000).pipe(
      map(x => {
        return Math.floor((date.getTime() - new Date().getTime()) / 1000);
      })
    ).subscribe(timeToStartInSeconds=> { 
      if(timeToStartInSeconds !== undefined){
        this.timeToStart = this.dhms(timeToStartInSeconds) 
      }
    })
  }
}
