import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  ngOnInit() { }

  mobileMenuIsHidden = true;

  constructor() { }

  toggleSubmenu(event): void {
    this.mobileMenuIsHidden === true ? this.mobileMenuIsHidden = false : this.mobileMenuIsHidden = true;
  }
}
