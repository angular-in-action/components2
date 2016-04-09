import {Component, View, provide} from 'angular2/core'
import {StockList} from './stockList'
import {StockFull} from './stockFull'
import {StocksService} from '../services/StocksService'

@Component({
  selector: 'StockSearch',
  providers: [StocksService]
})
@View({
  template: `
    <section>
      <h3>Stock Price & Name Lookup:</h3>
      <form (submit)="doSearch()">
        <input [(ngModel)]="searchText"/>
      </form>
      <StockList [stocks]="stocks" (showStock)="currStock=$event"></StockList>
      <StockFull *ngIf="currStock" [stock]="currStock"></StockFull>
    </section>
  `,
  directives: [StockList,StockFull]
})
export class StockSearch {
  searchText: string;
  stocks: Object[];
  currStock: Object = undefined;
  
  constructor(public stockService:StocksService) {}
  
  doSearch() {
    this.stockService.snapshot(this.searchText)
    .subscribe(
      (data) => {this.stocks = data},
      (err) => {console.log('error!', err)}
    );
  }
}