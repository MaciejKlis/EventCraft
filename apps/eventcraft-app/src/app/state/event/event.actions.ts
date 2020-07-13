import { Event } from './event.model';

export class CreateEvents {
  static readonly type = '[event] create event';
  constructor(public eventsToAdd: Event[]) { }
}

export class AddExistingEvents {
  static readonly type = '[event] add existing events'
  constructor(public allEvents: Event[]) { }
}

export class ReorderByCreateTime {
  static readonly type = '[event] reorder by create time'
  constructor(public orderType: string) { }
}

export class RemoveEvent {
  static readonly type = '[event] remove event'
  constructor(public idEvent: string) { }
}

export class UpdateEvent {
  static readonly type = '[event] update event'
  constructor(public event: Event) { }
}