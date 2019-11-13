import { State, StateContext, Action, Selector, NgxsOnInit, Store } from '@ngxs/store';
import { Event, EventStateModel } from './event.model';
import { CreateEvent, AddExistingEvents, RemoveEvent, UpdateEvent } from './event.actions';
import { EventsService } from './events.service';
import { Observable, observable, empty } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@State<EventStateModel>({
name: 'events',
    defaults: {
        events: []
    }   
})

export class EventState implements NgxsOnInit{
    public events$: Observable<Event[]>
    
    constructor(private eventsService: EventsService,
                private store: Store){}

    @Selector()
    static events(state: EventStateModel) {
        return state.events
    }
    
    @Action(AddExistingEvents)
    addExistingEvents({ patchState }: StateContext<EventStateModel>, { allEvents }: AddExistingEvents) {        
        patchState({
            events: [...allEvents]
        });
    }

    @Action(CreateEvent)
    createEvent({ getState, patchState }: StateContext<EventStateModel>, { event }: CreateEvent) {
        this.eventsService.insertEvent(event)
        .pipe(map(id => id['id']))
        .pipe(switchMap(id => id ? this.eventsService.getEventById(id) : empty() ))
        .subscribe(event => {
            const { events } = getState();
            patchState({
                events: [
                    ...events,
                    event
                ]
            });
        });
    }

    @Action(RemoveEvent)
    removeEventListener({getState, patchState}: StateContext<EventStateModel>, { idEvent }: RemoveEvent){
        this.eventsService.removeEventById(idEvent).subscribe();

        patchState({
            events: getState().events.filter(a => a.id !== idEvent)
        });
    }

    @Action(UpdateEvent)
    updateEvent({ getState, patchState }: StateContext<EventStateModel>, { event }: UpdateEvent) {
        this.eventsService.updateElementById(event).subscribe();

        const { events } = getState();
        const indexOfUpdatedEvent = events.findIndex(existEvent => existEvent.id === event.id);
        events[indexOfUpdatedEvent] = event;

        patchState({
            events
        });
    }

    ngxsOnInit(ctx: StateContext<EventStateModel>){
        this.events$ = this.eventsService.getAllEvents()
        this.events$.subscribe(events=>{
            this.store.dispatch(new AddExistingEvents(events))
        })
    }
}