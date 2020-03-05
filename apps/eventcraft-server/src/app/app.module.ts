import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { EventsModule } from './events/event.module';

@Module({
  imports: [ 
    EventsModule,
    MongooseModule.forRoot('mongodb+srv://maciej:fPxrj0GHPObzUyb9@klisiucluster-q5a6w.mongodb.net/test?retryWrites=true&w=majority'),],
  controllers: [],
  providers: []
})

export class AppModule {}
