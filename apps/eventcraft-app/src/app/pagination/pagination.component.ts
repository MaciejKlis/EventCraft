import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalResults: number;
  @Input() resultsOnPage: number;
  @Output() emitNumberOfNexPage: EventEmitter<number> = new EventEmitter;


  pageNumbers: number[] = [];
  activePage = 1;
  constructor() { }

  ngOnInit(): void {
    const numberOfPages = Math.ceil(this.totalResults / this.resultsOnPage);
    for (let i = 1; i <= numberOfPages; i++) this.pageNumbers.push(i);
  }


  changePage(pageNumber: number): void {
    this.activePage = pageNumber;

    this.emitNumberOfNexPage.emit(pageNumber);
  }
}
