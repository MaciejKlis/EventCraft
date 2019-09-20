import { Event } from './event.model';

export class CreateEvent {
  static readonly type = '[event] create event';
  constructor(public event: Event) { }
}