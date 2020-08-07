import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Patch,
	Delete,
	Query
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.model';

@Controller('events')
export class EventsController {
	constructor(private readonly eventService: EventService) { }

	@Post()
	async addEvent(@Body() events: Event[]) {
		return await this.eventService.insertEvent(events);
	}

	@Get()
	async getAllEvents() {
		return await this.eventService.getEvents()
	}

	@Get('history')
	async getPage(
		@Query('pageNumber') pageNumber,
		@Query('amountOfResults') amountOfResults
	) {
		return await this.eventService.getPage(parseInt(pageNumber), parseInt(amountOfResults));
	}

	@Get(':id')
	getEvent(@Param('id') id) {
		return this.eventService.getSingleEvent(id);
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
