import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Patch,
	Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.model';

@Controller('events')
export class EventsController {
	constructor(private readonly eventService: EventService) { }

	@Post()
	async addEvent(@Body() events: Event[]) {
		const generatedEvents = await this.eventService.insertEvent(events);
		return generatedEvents;
	}

	@Get()
	async getAllEvents() {
		const events = await this.eventService.getEvents()
		return events;
	}

	@Get(':id')
	getEvent(@Param('id') prodId: string) {
		return this.eventService.getSingleEvent(prodId);
	}

	@Patch(':id')
	async updateEvent(@Body() event: Event) {
		const result = await this.eventService.updateEvent(event);
		return null;
	}

	@Delete(':id')
	async removeEvent(@Param('id') eventId: string) {
		await this.eventService.deleteEvent(eventId);
		return null;
	}
}
