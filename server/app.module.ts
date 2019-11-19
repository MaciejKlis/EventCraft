import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { EventsController } from './src/events/event.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { EventsModule } from './src/events/event.module';


@Module({
  imports: [
    EventsModule,
    MongooseModule.forRoot('mongodb+srv://maciej:fPxrj0GHPObzUyb9@klisiucluster-q5a6w.mongodb.net/test?retryWrites=true&w=majority'),
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    })
  ],
  controllers: []
})
export class ApplicationModule {}
