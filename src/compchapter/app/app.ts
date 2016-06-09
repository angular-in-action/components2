import {Component, View, AfterViewInit, AfterViewChecked, ViewChild} from 'angular2/core'
// import {StockSearch} from './components/stockSearch';
import {StockNav} from '../components/StockNav';
import {AddStock} from '../components/AddStock';
import {TotalStock} from '../components/TotalStock';
import {ListStocks} from '../components/ListStocks';
import {NewsStocks} from '../components/NewsStocks';
import {StocksService} from '../services/StocksService';

@Component({
  selector: 'App',
  templateUrl: './app/app.html',
  directives: [StockNav,AddStock,TotalStock,ListStocks,NewsStocks],
  providers: [StocksService]
})
export class App implements AfterViewInit, AfterViewChecked{

  public stocksData: Array<Object> = [];
  public showArticlesFor: string = '';
  @ViewChild(ListStocks)
  private _listStocks: ListStocks

  constructor(){}

  // TODO: Add something here to get the children of the ListStocks component so
  // we can get the total of the stocks owned. 
  // Not sure, but might need to turn the individual lines of output stock into 
  //   components of their own so we can get them. 
  // 5/3/16: Can read down into ListStocks.stocksData and set it here so we 
  //  get the numbers when it changes. 
  ngAfterViewInit() {
    setTimeout( () => {
      // NOTE: console.log("this._listStocks empty to begin", this._listStocks.stocksData)
      this.stocksData = this._listStocks.stocksData
    },0)
  }

  setShowArticlesFor(evt) {
    this.showArticlesFor = evt;
  }

  // TODO: Look at this again as I think it caused problems -- see what problems it caused
  //  and figured out when you would/wouldn't use it. 
  ngAfterViewChecked() {
    // console.log("ngAfterViewChecked")
    // setTimeout(() => {
    //   this.stocksData = this._listStocks.getTotal()
    //   console.log("this._listStocks", this.stocksData)
    // }, 0)
    // console.log("afterViewChecked");
    // console.log("this._listStocks after check", this._listStocks)
    // setTimeout( () => {
    //   this.stocksData = this._listStocks.stocksData
    // },0)
  }


  
}
