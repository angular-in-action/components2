// List people
import {Component, EventEmitter} from 'angular2/core';
import {StocksService} from './../services/StocksService';
import {Stock} from '../models/Stock';

@Component({
  selector: 'AddStock',
  templateUrl: './components/addStock.html'
})
export class AddStock {

  public stockList: Array<Object>;

  constructor(public stocksService:StocksService) { 
    this.stock = new Stock();
  };

  // TODO: Need to get the form to clear after submitting. 
  //  See the Angular 2 docs on forms as it is covered in there. 
  addStock() {
    this.stocksService.addStock(this.stock);
    this.stock = new Stock();
  }
}

