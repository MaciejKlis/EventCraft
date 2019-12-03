import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngxs/store';
import { RemoveEvent } from '../state/event/event.actions';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-single-event-view',
  templateUrl: './single-event-view.component.html',
  styleUrls: ['./single-event-view.component.scss']
})
export class SingleEventViewComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }
  
  id:string
  event$: Observable<Event>;
  timeToStart: string = " ";
  startEvent: Date;

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

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.event$ = this.store.select(EventState.selectById(this.id))

    this.event$.subscribe(ev => {
      if(ev){
        ev.type = this.swichtEnumToString(ev.type);
        this.startEvent = new Date(ev.startAt)
      }
    })
  }


  removeEvent(){
    this.store.dispatch(new RemoveEvent(this.id))
    this.router.navigateByUrl('/search')
  }
}
