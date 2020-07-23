import { Event } from '../state/event/event.model';

export class EventFactory {
	static create(): Event {
		let randomName = [
			'Bon Appétit presents',
			'INDIGOAT Tour',
			'Commons Artist Project',
			'Brendan Fernandes',
			'A Call and Response',
			'DESTINOS',
			'3rd International Latino',
			'Theater Festival'
		]

		let randomDescriptions = [
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

		let randomOrganizer = [
			'Coca-cola',
			'Sobieski',
			'Knixiie',
			'Sioxy',
			'Zurqe',
			'Mieq',
			'owozurzy'
		]

		let randomLocalization = [
			{ city: 'Warsaw', lat: 52.2329172, lng: 20.9911555 },
			{ city: 'Chicago', lat: 41.883228, lng: -87.632401 },
			{ city: 'Berlin', lat: 52.520008, lng: 13.404954 },
			{ city: 'Moscow', lat: 55.755825, lng: 37.617298 },
			{ city: 'Paris', lat: 48.856613, lng: 2.352222 },
			{ city: 'Madrid', lat: -29.102940, lng: -56.554611 },
			{ city: 'Wien', lat: 48.2203445, lng: 16.09988 }
		]

		let randomTypes = [
			'conference',
			'golfEvents',
			'themeParties',
			'wedding',
			'birthday',
		]

		let randomImgs = [
			'https://media2.fdncms.com/stranger/imager/u/large/40626741/chbp_17_day_2_-_image_joshua_lewis-21_copy.jpg',
			'https://www.hsuevents.com/images/ogimage.jpg',
			'https://warsawnow.pl/wp-content/uploads/2019/07/kino-letnie-w-lazienkach.jpg',
			'http://i1288.photobucket.com/albums/b485/Wirtualne_Pniewy/3krolowie/aktywniplus50/bzdr/LA/czyt/kino-3_zpswozaimis.jpg',
			'http://www.lazienki-krolewskie.pl/public/upload/news/big/593e8aeac5998.jpg'
		]

		let randomDate = (start, end) => {
			return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
		}

		let startAt = randomDate(new Date(), new Date(2021, 1, 12));
		let endAt = randomDate(startAt, new Date(2021, 1, 14));

		return {
			name: randomName[Math.floor(Math.random() * randomName.length)],
			description: randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)],
			organizer: randomOrganizer[Math.floor(Math.random() * randomOrganizer.length)],
			localization: randomLocalization[Math.floor(Math.random() * randomLocalization.length)],
			startAt: startAt,
			endAt: endAt,
			type: randomTypes[Math.floor(Math.random() * randomTypes.length)],
			imageUrl: randomImgs[Math.floor(Math.random() * randomImgs.length)],
			random: true,
		}
	}
}