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
  
@Controller('events')
export class EventsController {
	constructor(private readonly eventService: EventService) {}

	@Post()
	async addEvent(
		@Body('name') eventName: string,
		@Body('description') eventDescription: string,
		@Body('organizer') eventOrganizer: string,
		@Body('localization') eventLocalization: string,
		@Body('startAt') eventStartAt: Date,
		@Body('endAt') eventEndAt: Date,
		@Body('type') eventType: string,
		@Body('imageUrl') eventImageUrl: string,
	) {
		const generatedId = await this.eventService.insertEvent(
			eventName,
			eventDescription,
			eventOrganizer,
			eventLocalization,
			eventStartAt,
			eventEndAt,
			eventType,
			eventImageUrl
		);
		return { id: generatedId };
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
	async updateEvent(
		@Param('id') eventId: string,
		@Body('name') eventName: string,
		@Body('description') eventDescription: string,
		@Body('organizer') eventOrganizer: string,
		@Body('localization') eventLocalization: string,
		@Body('startAt') eventStartAt: Date,
		@Body('endAt') eventEndAt: Date,
		@Body('type') eventType: string,
		@Body('imageUrl') eventImageUrl: string,
	) {
		await this.eventService.updateEvent(
			eventId,
			eventName,
			eventDescription,
			eventOrganizer,
			eventLocalization,
			eventStartAt,
			eventEndAt,
			eventType,
			eventImageUrl
		);

		return null;
	}

	@Delete(':id')
	async removeEvent(@Param('id') eventId: string) {
			await this.eventService.deleteEvent(eventId);
			return null;
	}
}
