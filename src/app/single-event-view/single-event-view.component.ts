import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { RemoveEvent } from '../state/event/event.actions';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { Observable, interval, Subscription } from 'rxjs';
import { map, debounceTime, debounce } from 'rxjs/operators'

@Component({
  selector: 'app-single-event-view',
  templateUrl: './single-event-view.component.html',
  styleUrls: ['./single-event-view.component.scss']
})
export class SingleEventViewComponent implements OnInit {

  @Select(EventState.events) events$: Observable<Event[]>;
  timeToStart:string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }
  
  id: string;
  event: Event;

  dhms = (t) => {
    let days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`  
  }

  swichtEnumToString = (type:string) => {
    switch (type) {
      case 'conference': 
        return 'Conference';
      case 'golfEvents':
        return 'Golf event';
      case 'themeParties':
        return 'Theme party';
      case 'wedding':
        return 'Wedding';
      case 'birthday':
        return 'Birthday'
      default:
        return 'Other';
    }
  }

  onInitSubscription: Subscription;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.onInitSubscription = this.events$
    .pipe(
      map(events => events.filter(ev => ev.id === this.id)),
      debounceTime(700)
    )
    .subscribe(event => {
      if(event.length){
        this.event = event[0];
        this.event.type = this.swichtEnumToString(event[0].type);
      } else {
        alert("Event doesn't exist")
        this.router.navigateByUrl('/search')
      }
    })

    //Wait for debounce event
    setTimeout(()=>{
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
    },1000)
  }

  removeEvent(){
    this.store.dispatch(new RemoveEvent(this.event.id))
    this.router.navigateByUrl('/search')
  }

  ngOnDestroy(){
    this.onInitSubscription.unsubscribe();
  }
}
