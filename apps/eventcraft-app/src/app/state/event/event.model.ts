export interface Event {
    id?: string;
    name: string;
    description: string;
    organizer: string;
    localization: string;
    startAt: Date;
    endAt: Date;
    type: string;
    imageUrl: string;
    createdAt?: Date;
}

export interface EventStateModel {
    events: Event[];
}

export enum EventType {
    CONFERENCE = 'CONFERENCE',
    GOLF_EVENTS = 'GOLF_EVENTS',
    THEME_PARTIES = 'THEME_PARTIES',
    WEDDING = 'WEDDING',
    BIRTHDAY = 'BIRTHDAY'
}