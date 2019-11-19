import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { SingleEventViewComponent } from './single-event-view/single-event-view.component';
import { SingleEventEditComponent } from './single-event-edit/single-event-edit.component';

const routes: Routes = [
  { 
    path: 'create', 
    component: EventCreatorComponent 
  },
  {
    path: '',
    component: EventsViewComponent
  },
  {
    path: 'event/:id',
    component: SingleEventViewComponent
  },
  {
    path: 'event/edit/:id',
    component: SingleEventEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
