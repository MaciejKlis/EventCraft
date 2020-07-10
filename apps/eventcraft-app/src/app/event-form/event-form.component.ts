import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Event } from '../state/event/event.model';
@Component({
  selector: 'eventcraft-workspace-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() event: Event;
  @Output() updatedEvent = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  eventForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    organizer: ['', [Validators.required]],
    localization: ['', [Validators.required]],
    startAt: ['', [Validators.required]],
    endAt: ['', [Validators.required]],
    type: ['', [Validators.required]],
    imageSrc: ['', [Validators.required]],
  })

  calendar = {
    minDate: new Date(),
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
    this.eventForm.setValue({
      name: this.event.name,
      description: this.event.description,
      localization: this.event.localization,
      organizer: this.event.organizer,
      startAt: this.event.startAt,
      endAt: this.event.endAt,
      type: this.event.type,
      imageSrc: this.event.imageUrl,
    })
  }

  setMinimalCalendarDate(): void { }

  setMaxymalCalendarDate(): void { }

  sendEvent(): void {
    this.event.name = this.eventForm.controls['name'].value;
    this.event.description = this.eventForm.controls['description'].value;
    this.event.organizer = this.eventForm.controls['organizer'].value;
    this.event.localization = this.eventForm.controls['localization'].value;
    this.event.startAt = this.eventForm.controls['startAt'].value;
    this.event.endAt = this.eventForm.controls['endAt'].value;
    this.event.type = this.eventForm.controls['type'].value;
    this.event.imageUrl = this.eventForm.controls['imageSrc'].value;

    this.updatedEvent.emit(this.event);
  }
}
