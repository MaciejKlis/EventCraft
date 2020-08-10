import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Event } from '../state/event/event.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'eventcraft-workspace-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: Event;
  @Output() updatedEvent = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  eventForm: FormGroup;
  calendarStartAt: Subscription;
  position = {
    lat: 0,
    lng: 0
  }

  calendar = {
    minDateStartAt: new Date(),
    minDateEndAt: new Date(),
    showTime: true,
  }

  types = [
    { label: 'Conference', value: 'conference', icon: 'pi pi-comments' },
    { label: 'Golf Event', value: 'golfEvents', icon: 'pi pi-shopping-cart' },
    { label: 'Theme Party', value: 'themeParties', icon: 'pi pi-eye' },
    { label: 'Wedding', value: 'wedding', icon: 'pi pi-video' },
    { label: 'Birthday', value: 'birthday', icon: 'pi pi-unlock' },
  ];

  ngOnInit(): void {
    this.event = this.event || {
      name: '',
      description: '',
      organizer: '',
      localization: {
        city: '',
        lat: 0,
        lng: 0,
      },
      startAt: new Date(),
      endAt: new Date(),
      type: '',
      imageUrl: ''
    };

    this.eventForm = this.fb.group({
      name: [this.event.name, [Validators.required]],
      description: [this.event.description, [Validators.required]],
      organizer: [this.event.organizer, [Validators.required]],
      localization: this.fb.group({
        city: [this.event.localization.city, [Validators.required]],
        lat: [{ value: this.event.localization.lat, disabled: true }, [Validators.required]],
        lng: [{ value: this.event.localization.lng, disabled: true }, [Validators.required]]
      }),
      startAt: [this.event.startAt, [Validators.required]],
      endAt: [this.event.endAt, [Validators.required]],
      type: [this.event.type, [Validators.required]],
      imageSrc: [this.event.imageUrl, [Validators.required]],
    })

    this.calendarsOnChange();
  }

  setPosition(data) {
    this.eventForm.get('localization.lat').setValue(data.lat);
    this.eventForm.get('localization.lng').setValue(data.lng);
  }

  calendarsOnChange() {
    this.calendarStartAt = this.eventForm.get('startAt').valueChanges.subscribe(date => {
      const startAtDate = date;
      const endAtDate = this.eventForm.get('endAt');

      this.calendar.minDateEndAt = startAtDate;
      if (startAtDate > endAtDate.value) endAtDate.setValue(startAtDate);
    })
  }

  sendEvent(): void {
    this.event.name = this.eventForm.get('name').value;
    this.event.description = this.eventForm.get('description').value;
    this.event.organizer = this.eventForm.get('organizer').value;
    this.event.localization.city = this.eventForm.get('localization.city').value;
    this.event.localization.lat = this.eventForm.get('localization.lat').value;
    this.event.localization.lng = this.eventForm.get('localization.lng').value;
    this.event.startAt = this.eventForm.get('startAt').value;
    this.event.endAt = this.eventForm.get('endAt').value;
    this.event.type = this.eventForm.get('type').value;
    this.event.imageUrl = this.eventForm.get('imageSrc').value;

    this.updatedEvent.emit(this.event);
  }

  ngOnDestroy() {
    this.calendarStartAt.unsubscribe();
  }
}
