import {Component, View, OnInit} from 'angular2/core'
import {StockSearch} from './components/stockSearch';
import {StockNav} from './components/StockNav';
import {AddStock} from './components/AddStock';
import {TotalStock} from './components/TotalStock';
import {ListStocks} from './components/ListStocks';
import {NewsStocks} from './components/NewsStocks';

@Component({
  selector: 'App',
  templateUrl: './app/app.html',
  directives: [StockSearch,StockNav,AddStock,TotalStock,ListStocks,NewsStocks]
})
export class App implements OnInit{

  stocksList: string[] = [];
  showArticles: string = '';
  
  constructor(){
    console.log("In constructor");
  }

  ngOnInit() {
    this.stocksList.push(
      {symbol: 'CRM', own: 100},
      {symbol: 'IBM', own: 200 },
      {symbol: 'AAPL', own: 300 }
    );
    console.log("initing the app", this.stocksList);
  }

  // Catch the event from ListStocks.ts to show the article 
  //  Set a var into NewsStocks.ts that causes the query to run to get the articles.
}
