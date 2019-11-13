import { Component, OnInit } from '@angular/core';
import { Event, EventStateModel } from './state/event/event.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public events$: Observable<Event[]>;

  constructor(private store: Store){}

  ngOnInit() {
    
  }
}
