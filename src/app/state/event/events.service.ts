import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Event } from './event.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  public getAllEvents(){
    return this.http.get<Event[]>('http://localhost:3000/events')
      .pipe(map( events  => events.map(event => (
        {
          id: event.id,
          name: event.name,
          description: event.description,
          organizer: event.organizer,
          localization: event.localization,
          startAt: event.startAt,
          endAt: event.endAt,
          type: event.type,
          imageUrl: event.imageUrl
        } 
      ))))
  }

  public insertEvent(event: Event){
    return this.http.post<Event[]>('http://localhost:3000/events', event)
  }

  public getEventById(id: string){
    return this.http.get<Event>('http://localhost:3000/events/' + id)
  }

  public removeEventById(id: string){
    return this.http.delete<Event>('http://localhost:3000/events/' + id)
  }

  public updateElementById(event: Event){
    return this.http.patch<Event>('http://localhost:3000/events/' + event.id, event)
  }
}