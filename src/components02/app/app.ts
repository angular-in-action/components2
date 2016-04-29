import {Component, View} from 'angular2/core'
import {StockSearch} from './components/stockSearch';
import {StockNav} from './components/StockNav';
import {AddStock} from './components/AddStock';
import {TotalStock} from './components/TotalStock';
import {ListStocks} from './components/ListStocks';
import {NewsStocks} from './components/NewsStocks';
import {StocksService} from './services/StocksService';

@Component({
  selector: 'App',
  templateUrl: './app/app.html',
  directives: [StockSearch,StockNav,AddStock,TotalStock,ListStocks,NewsStocks],
  providers: [StocksService]
})
export class App {

  stocksList: string[] = [];
  showArticles: string = '';
  
  constructor(){}

  // Catch the event from ListStocks.ts to show the article 
  //  Set a var into NewsStocks.ts that causes the query to run to get the articles.
}
