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
    return await this.eventModel.findById(eventId);
  }

  async getPage(pageNumber, amountOfResults) {
    const amountOfRemoved = await this.eventModel.find({ "removed": true }).count();
    const events = await this.eventModel
      .find({ "removed": true })
      .skip(pageNumber > 0 ? (pageNumber - 1) * amountOfResults : 0)
      .limit(amountOfResults);

    const results = {
      amountOfRemoved,
      events
    }

    return results;
  }

  async updateEvent(event: Event) {
    await this.eventModel.updateOne({ _id: event._id }, event)
  }

  async deleteEvent(_id: string) {
    await this.eventModel.updateOne({ _id }, { $set: { "removed": true } })
  }
}
