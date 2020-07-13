import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Event } from './event.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:3333/api/events/'

  public getAllEvents() {
    return this.http.get<Event[]>(this.apiUrl)
      .pipe(map(events => events.map(event => {
        return ({
          _id: event._id,
          name: event.name,
          description: event.description,
          organizer: event.organizer,
          localization: event.localization,
          startAt: event.startAt,
          endAt: event.endAt,
          type: event.type,
          imageUrl: event.imageUrl,
          createdAt: event.createdAt
        })
      }
      )))
  }

  public insertEvent(event: Event[]) {
    return this.http.post<Event[]>(this.apiUrl, event)
  }

  public getEventById(id: string) {
    return this.http.get<Event>(this.apiUrl + id)
  }

  public removeEventById(id: string) {
    return this.http.delete<Event>(this.apiUrl + id)
  }

  public updateElementById(event: Event) {
    return this.http.patch<Event>(this.apiUrl + event._id, event)
  }
}