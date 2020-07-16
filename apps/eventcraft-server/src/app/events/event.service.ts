import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) { }

  async insertEvent(events: Event[]) {
    let addedEvents = await this.eventModel.insertMany(events)
    return addedEvents;
  }


  async getEvents() {
    const events = await this.eventModel.find({ "removed": false }).exec();
    return events;
  }

  async getSingleEvent(eventId: string) {
    const event = await this.findEvent(eventId);
    return event;
  }

  async updateEvent(event: Event) {
    await this.eventModel.updateOne({ _id: event._id }, event)
  }

  async deleteEvent(_id: string) {
    const say = await this.eventModel.updateOne({ _id }, { $set: { "removed": true } })
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
