import { Data } from '@angular/router';

export interface Event {
    id: number;
    name: string;
    description: string;
    organizer: string;
    localization: string;
    startAt: Date;
    endAt: Date;
    type: string;
    imageUrl: string;
}

export interface EventStateModel {
    events: Event[];
}