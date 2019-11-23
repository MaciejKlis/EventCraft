import { Component, OnInit, OnDestroy} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveEvent, ReorderByCreateTime } from '../state/event/event.actions';
import { Observable, Subscription } from 'rxjs';
import { EventState } from '../state/event/event.state';
import { Event } from '../state/event/event.model';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss']
})
export class EventsViewComponent implements OnInit, OnDestroy {
  @Select(EventState.events) events$: Observable<Event[]>;

  constructor(private store: Store) { }

  sortOptions = [
    {label:'The Oldest', value: 'oldest' },
    {label:'The Latest', value: 'latest' },
  ];
  
  selectedOrder:string


  private eventSubscription: Subscription;

  changeOrder(order:string){
    this.store.dispatch(new ReorderByCreateTime(order))
  }

  ngOnInit() {
    this.eventSubscription = this.events$.subscribe();
  }

  removeEvent(idEvent: string){
    this.store.dispatch(new RemoveEvent(idEvent))
  }

  ngOnDestroy(){
    this.eventSubscription.unsubscribe();
  }
}
