import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from './event.model';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = environment.baseUrl + '/events/';

  public getAllEvents() {
    return this.http.get<Event[]>(this.apiUrl);
  }

  public insertEvent(event: Event[]) {
    return this.http.post<Event[]>(this.apiUrl, event);
  }

  public getEventById(id: string) {
    return this.http.get<Event>(this.apiUrl + id);
  }

  public removeEventById(id: string) {
    return this.http.delete<Event>(this.apiUrl + id);
  }

  public updateElementById(event: Event) {
    return this.http.patch<Event>(this.apiUrl + event._id, event);
  }

  public getPageOfRemovedEvents(pageNumber, amountOfResults) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('amountOfResults', amountOfResults);

    return this.http.get<Event>(this.apiUrl + 'history', { params: params });
  }
}