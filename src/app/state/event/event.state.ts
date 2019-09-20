import { State, StateContext, Action, Selector } from '@ngxs/store';
import { Event, EventStateModel } from './event.model';
import { CreateEvent } from './event.actions';

@State<EventStateModel>({
name: 'events',
    defaults: {
        events: []
    }   
})
export class EventState {
    
    @Selector()
    static events(state: EventStateModel) {
        return state.events
    }

    @Action(CreateEvent)
    createEvent({ getState, patchState }: StateContext<EventStateModel>, { event }: CreateEvent) {
        const { events } = getState();
            patchState({
            events: [
                ...events,
                event
            ]
        });
    }
}