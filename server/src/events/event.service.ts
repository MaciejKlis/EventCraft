import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Event } from './event.model';
``
@Injectable()
export class EventService {
  private events: Event[] = [];

  constructor(@InjectModel('Event') private readonly eventModel: Model<Event>){}

  async insertEvent(
    name: string,
    description: string,
    organizer: string,
    localization: string,
    startAt: Date,
    endAt: Date,
    type: string,
    imageUrl: string,
  ) {
    const newEvent = new this.eventModel({
      name,
      description,
      organizer,
      localization,
      startAt,
      endAt,
      type,
      imageUrl
    });
    
    const result = await newEvent.save();
    return result.id;
  }

  async getEvents() {
    const events = await this.eventModel.find().exec();
    return events.map( event => ({ 
      id: event.id,
      name: event.name,
      description: event.description,
      organizer: event.organizer,
      localization: event.localization,
      startAt: event.startAt,
      endAt: event.endAt,
      type: event.type,
      imageUrl: event.imageUrl
    }));
  }

  async getSingleEvent(eventId: string) {
    const event = await this.findEvent(eventId);
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      organizer: event.organizer,
      localization: event.localization,
      startAt: event.startAt,
      endAt: event.endAt,
      type: event.type,
      imageUrl: event.imageUrl,
    };
  }

  async updateEvent(
    eventId: string,
    name: string,
    description: string,
    organizer: string,
    localization: string,
    startAt: Date,
    endAt: Date,
    type: string,
    imageUrl: string,
    ) {
      
    await this.eventModel.updateOne({_id: eventId}, {
      name,
      description,
      organizer,
      localization,
      startAt,
      endAt,
      type,
      imageUrl
    })
  }

  async deleteEvent(prodId: string) {
    await this.eventModel.deleteOne({_id: prodId}).exec();
  }

  private async findEvent(id: string): Promise<Event> {
    let event;
    
    try {
      event = await this.eventModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find event.');
    }
    
    if (!event) {
      throw new NotFoundException('Could not find event.');
    }

    return event;
  }
}
