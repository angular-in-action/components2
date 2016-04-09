// List people
import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'StockFull',
  inputs: ['stock'],
  template: `
    <header>Full Stock Info</header>
    <div>
      <label>Name</label><div>{{stock.name}}</div>
      <label>Symbol</label><div>{{stock.symbol}}</div>
      <label>Ask</label><div>{{stock.ask}}</div>
      <label>Average Daily Volume</label><div>{{stock.averageDailyVolume}}</div>
    </div>
  `
})
export class StockFull {
  public stock: Object;

  constructor() { };
}