import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: String, required: true },
  localization: {
    city: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export interface Event extends mongoose.Document {
  _id?: number;
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
}
