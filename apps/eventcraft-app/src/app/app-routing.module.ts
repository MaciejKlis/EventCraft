import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { SingleEventViewComponent } from './single-event-view/single-event-view.component';
import { SingleEventEditComponent } from './single-event-edit/single-event-edit.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HistoryOfEventsComponent } from './history-of-events/history-of-events.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'search',
    component: EventsViewComponent
  },
  {
    path: 'create',
    component: EventCreatorComponent
  },
  {
    path: 'history',
    component: HistoryOfEventsComponent
  },
  {
    path: 'event/:id',
    component: SingleEventViewComponent
  },
  {
    path: 'event/edit/:id',
    component: SingleEventEditComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
