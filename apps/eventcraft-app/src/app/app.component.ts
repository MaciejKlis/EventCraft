import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private router: Router) { }

  @HostBinding('style.background') background = "#262939"
  colorPicker: string;
  isHomePage = true;

  ngOnInit() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(event => event.urlAfterRedirects)
      )
      .subscribe(url => {
        this.isHomePage = url === '/' ? true : false;
      })
  }

  changeBackground() {
    this.background = this.colorPicker;
  }
}
