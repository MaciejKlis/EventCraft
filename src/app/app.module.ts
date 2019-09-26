import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FormsModule }    from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { EventState } from './state/event/event.state';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [
    AppComponent,
    EventCreatorComponent,
    NavbarComponent,
    EventsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    NgxsModule.forRoot([
      EventState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
