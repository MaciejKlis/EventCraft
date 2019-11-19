import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './event.controller';
import { EventService } from './event.service';
import { EventSchema } from './event.model';

@Module({
    imports: [ MongooseModule.forFeature([{name: 'Event', schema: EventSchema}]) ],
    controllers: [EventsController],
    providers: [EventService],
})
export class EventsModule {}
