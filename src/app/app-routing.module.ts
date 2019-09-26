import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { EventsViewComponent } from './events-view/events-view.component';

const routes: Routes = [
  { 
    path: 'create', 
    component: EventCreatorComponent 
  },
  {
    path: '',
    component: EventsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
