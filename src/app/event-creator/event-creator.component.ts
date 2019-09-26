import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateEvent } from '../state/event/event.actions';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})

export class EventCreatorComponent implements OnInit {
  constructor(
    private store: Store
  ) {}

  types = [
    {label: 'Conference', value: 'Conference', icon: 'pi pi-comments'},
    {label: 'Golf Event', value: 'golfEvents', icon: 'pi pi-shopping-cart'},
    {label: 'Theme Party', value: 'themeParties', icon: 'pi pi-eye'},
    {label: 'Wedding', value: 'wedding', icon: 'pi pi-video'},
    {label: 'Birthday', value: 'birthday', icon: 'pi pi-unlock'},
  ];

  eventName: string;
  eventDescription: string;
  eventOrganizer: string;
  eventLocalization: string;
  eventStart: Date;
  eventEnd: Date;
  eventType: string;
  eventImage: string;

  private id = 0;
  
  ngOnInit() {}
  
  createEvent(){
    this.store.dispatch(
      new CreateEvent({ 
        id: this.id,
        name: this.eventName,
        description: this.eventDescription,
        organizer: this.eventOrganizer,
        localization: this.eventLocalization,
        startAt: this.eventStart,
        endAt: this.eventEnd,
        type: this.eventType,
        imageUrl: this.eventImage,
      })  
    );
    this.id += 1;
  }

  randomName = [
    'Bon Appétit presents', 
    'INDIGOAT Tour', 
    'Commons Artist Project', 
    'Brendan Fernandes', 
    'A Call and Response',
    'DESTINOS',
    '3rd International Latino',
    'Theater Festival'
  ]

  randomDescriptions = [
    'Bon Appétit presents Chicago Gourmet is celebrating all things food & entertainment this September, and it’s going to be epic.',
    'Join chefs Andrew Zimmern, Rick Bayless, Stephanie Izard, Iron Chef Morimoto and many more for a fabulous weekend',
    'in Millennium Park with celebrity chef cooking demos, wine & mixology seminars, book signings and delicious food, wine, spirits, and beer tastings.',
    'Plus, special movie, TV, and theater-inspired culinary events throughout the week are sure to bring down the house.',
    'Get ready for Lights, Camera, Napkin! Make your plans now for Chicago Gourmet from Sept 24-29.',
    'Brendan Fernandes’s dance-based installation in the Commons, entitled A Call and Response, explores the ways society sees and values',
    'different kinds of bodies. Using language, architecture, and gesture to understand the nature of being seen',
    'Fernandes encourages dancers–and visitors–to collaborate and generate new forms of physical language that move and attract other bodies in space.',
    'Fernandes (Kenyan, b. 1979) seeks to isolate everyday actions, such as running for the bus or slinging a bag over your shoulder,',
    'considering individuals’ movements in social spaces as a kind of choreography. Over the course of the exhibition'
  ]

  randomOrganizer = [
    'Coca-cola',
    'Sobieski',
    'Knixiie',
    'Sioxy',
    'Zurqe',
    'Mieq',
    'owozurzy'
  ]

  randomLocalization = [
    'Warsaw',
    'Chicago',
    'Berlin',
    'Moscow',
    'Paris',
    'Madrid',
    'Wien'
  ]

  randomImgs = [
    'https://media2.fdncms.com/stranger/imager/u/large/40626741/chbp_17_day_2_-_image_joshua_lewis-21_copy.jpg',
    'http://zesportemnatak.pl/wp-content/uploads/2018/11/event-12-870x550.jpg',
    'https://www.hsuevents.com/images/ogimage.jpg',
    'https://warsawnow.pl/wp-content/uploads/2019/07/kino-letnie-w-lazienkach.jpg',
    'http://i1288.photobucket.com/albums/b485/Wirtualne_Pniewy/3krolowie/aktywniplus50/bzdr/LA/czyt/kino-3_zpswozaimis.jpg',
    'http://www.lazienki-krolewskie.pl/public/upload/news/big/593e8aeac5998.jpg'
  ]

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  createRandom(){
    let startAt = this.randomDate(new Date(), new Date(2021, 1 , 12));
    let endAt = this.randomDate(startAt, new Date(2021, 1 , 14));

    this.store.dispatch(
      new CreateEvent({ 
        id: this.id,
        name: this.randomName[Math.floor(Math.random()*this.randomName.length)],
        description: this.randomDescriptions[Math.floor(Math.random()*this.randomDescriptions.length)],
        organizer: this.randomOrganizer[Math.floor(Math.random()*this.randomOrganizer.length)],
        localization: this.randomLocalization[Math.floor(Math.random()*this.randomLocalization.length)],
        startAt: startAt,
        endAt: endAt,
        type: this.types[Math.floor(Math.random()*this.types.length)].label,
        imageUrl: this.randomImgs[Math.floor(Math.random()*this.randomImgs.length)],
      })  
    );
    this.id += 1;
  }
}
