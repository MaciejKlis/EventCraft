import { Component, OnInit, Input, Output, EventEmitter, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @Output() emitPosition: EventEmitter<{ lng: number, lat: number }> = new EventEmitter();
  @Input() editable: boolean;
  @Input() position: { lat: number, lng: number }
  mapOptions: any = {};
  overlays: any[];

  constructor() { }

  ngOnInit(): void {
    this.mapOptions.center = { lat: this.position.lat, lng: this.position.lng };

    if (!this.editable) {
      this.overlays = [
        new google.maps.Marker({ position: { lat: this.position.lat, lng: this.position.lng } })
      ];

      this.mapOptions.zoom = 12;
    } else {
      this.mapOptions.zoom = 1;
    }
  }

  handleMapClick(event) {
    if (this.editable) {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      this.overlays = [
        new google.maps.Marker({ position: { lat: position.lat, lng: position.lng } })
      ]

      this.emitPosition.emit(position);
    }
  }
}
