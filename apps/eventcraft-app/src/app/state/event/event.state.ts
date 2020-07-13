import { State, StateContext, Action, Selector, NgxsOnInit, Store, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Event, EventStateModel } from './event.model';
import { CreateEvents, AddExistingEvents, RemoveEvent, UpdateEvent, ReorderByCreateTime } from './event.actions';
import { EventsService } from './events.service';
import { Observable } from 'rxjs';


@State<EventStateModel>({
    name: 'events',
    defaults: {
        events: []
    }
})

@Injectable()
export class EventState implements NgxsOnInit {
    public events$: Observable<Event[]>

    constructor(private eventsService: EventsService,
        private store: Store) { }

    @Selector()
    static events(state: EventStateModel) {
        return state.events
    }

    @Selector()
    static nameFilter(name: string) {
        return createSelector([EventState], (state) => {
            return state.events.events.filter(ev => ev.name.toLowerCase().includes(name.toLowerCase()))
        })
    }

    @Selector()
    static selectById(id: string) {
        return createSelector([EventState], (state) => {
            return state.events.events.filter(ev => ev._id === id)[0];
        })
    }

    @Action(AddExistingEvents)
    addExistingEvents({ patchState }: StateContext<EventStateModel>, { allEvents }: AddExistingEvents) {
        patchState({
            events: [...allEvents]
        });
    }

    @Action(CreateEvents)
    createEvent({ getState, patchState }: StateContext<EventStateModel>, { eventsToAdd }: CreateEvents) {
        this.eventsService.insertEvent(eventsToAdd).subscribe(recentlyAddedEvents => {

            const { events } = getState();

            console.log(events)
            patchState({
                events: [
                    ...events,
                    ...recentlyAddedEvents
                ]
            })
        })
    }

    @Action(RemoveEvent)
    removeEventListener({ getState, patchState }: StateContext<EventStateModel>, { idEvent }: RemoveEvent) {
        this.eventsService.removeEventById(idEvent).subscribe();

        patchState({
            events: getState().events.filter(a => a._id !== idEvent)
        });
    }

    @Action(UpdateEvent)
    updateEvent({ getState, patchState }: StateContext<EventStateModel>, { event }: UpdateEvent) {
        this.eventsService.updateElementById(event).subscribe();

        const { events } = getState();
        const indexOfUpdatedEvent = events.findIndex(existEvent => existEvent._id === event._id);
        events[indexOfUpdatedEvent] = event;

        patchState({
            events
        });
    }

    @Action(ReorderByCreateTime)
    reorderByCreateTime({ getState, patchState }: StateContext<EventStateModel>, { orderType }: ReorderByCreateTime) {
        const { events } = getState();

        events.sort((a, b) => {
            let aTimestamp = new Date(a.createdAt).getTime();
            let bTimestamp = new Date(b.createdAt).getTime();

            return orderType === "latest" ? bTimestamp - aTimestamp : aTimestamp - bTimestamp;
        })

        patchState({
            events
        });
    }

    ngxsOnInit(ctx: StateContext<EventStateModel>) {
        this.events$ = this.eventsService.getAllEvents()
        this.events$.subscribe(events => {
            this.store.dispatch(new AddExistingEvents(events))
        })
    }
}