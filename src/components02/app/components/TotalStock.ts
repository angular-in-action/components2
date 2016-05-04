// List people
import {Component, EventEmitter, Input, OnChanges, SimpleChange, DoCheck} from 'angular2/core';

@Component({
  selector: 'TotalStock',
  templateUrl: './app/components/totalStock.html'
})
export class TotalStock implements OnChanges, DoCheck {

  public @Input() stocksData: Array<Object> = [];
  private prevLength: number = 0;
  public totalShares: number = 0; 
  public totalValue: number = 0;

  constructor() { };

  // TODO: Doesn't catch the change as only looks at the reference,
  //  not the details of the object. See if there is some way 
  //  in the parent to make this a new object each time so
  //  ngOnChanges does catch it. Perhaps bring in immutable.js
  //  which would give a way to demonstrate the OnPush change detection
  //  strategy.
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    console.log("TotalStock OnChanges", changes.stocksData)
  }

  // Can catch the changes with specific coding to find it
  ngDoCheck() {
    if (this.stocksData.length && this.stocksData.length !== this.prevLength) {
      this.computeTotals()
    }
  }

  computeTotals() {
    this.totalShares = this.totalValue = 0;
    this.stocksData.forEach( (item) => { 
      this.totalShares += item.own;
      this.totalValue += item.own * item.lastTradePriceOnly;
    })
  }


}