import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { EventState } from './state/event/event.state';
import { EventsService } from './state/event/events.service';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GMapModule } from 'primeng/gmap';
import { ColorPickerModule } from 'primeng/colorpicker';

import { AppRoutingModule } from './app-routing.module';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { SingleEventViewComponent } from './single-event-view/single-event-view.component';
import { SingleEventEditComponent } from './single-event-edit/single-event-edit.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EventFormComponent } from './event-form/event-form.component';
import { MapViewComponent } from './map-view/map-view.component';
import { HistoryOfEventsComponent } from './history-of-events/history-of-events.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    EventCreatorComponent,
    NavbarComponent,
    EventsViewComponent,
    SingleEventViewComponent,
    SingleEventEditComponent,
    LandingPageComponent,
    EventFormComponent,
    MapViewComponent,
    HistoryOfEventsComponent,
    PaginationComponent
  ],
  imports: [
    AppRoutingModule,
    CalendarModule,
    ColorPickerModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    GMapModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    SelectButtonModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      EventState
    ])
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
