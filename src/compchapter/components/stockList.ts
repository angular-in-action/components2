// List people
import {Component, EventEmitter, Input, Output} from 'angular2/core';

@Component({
  selector: 'StockList',
  template: `
    <ul class="stock-list">
      <li *ngFor="let stock of stocks" (click)="showStock.next(stock)"> 
        <strong>{{stock.symbol}} ({{stock.ask | currency:'USD':true}}):</strong> {{stock.name}}
      </li>
    </ul>
  `
})
export class StockList {
  public @Input() stocks: Array<string>;
  public @Output() showStock: EventEmitter = new EventEmitter();

  constructor() {}
}
