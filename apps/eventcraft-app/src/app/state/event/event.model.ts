export interface Event {
    _id?: string;
    name: string;
    description: string;
    organizer: string;
    localization: {
        city: string,
        lat: number,
        lng: number,
    }
    startAt: Date;
    endAt: Date;
    type: string;
    imageUrl: string;
    createdAt?: Date;
    removed?: boolean;
    random?: boolean;
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