import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateEvent } from '../state/event/event.actions';
import { EventFactory } from '../event-factory/eventFactory'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private store: Store){}

  createRandomEvent(){
    this.store.dispatch(
      new CreateEvent(EventFactory.create())  
    );
  }
}
