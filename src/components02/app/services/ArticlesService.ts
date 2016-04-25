//a simple service
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

@Injectable()
export class ArticlesService {

  private searchSymbol = 'CRM';
  apiKey = '53780fddf05dbce55bcbe957974a03ba6d09c413';
  url = `https://access.alchemyapi.com/calls/data/GetNews?apikey=${this.apiKey}&return=enriched.url.title,enriched.url.url,enriched.url.publicationDate,enriched.url.enrichedTitle.docSentiment&start=1460073600&end=1460761200&q.enriched.url.enrichedTitle.entities.entity=|text=${this.searchSymbol},type=company|&count=10&outputMode=json`;

  // TS shortcut "public" to put http on this
  constructor(public http:Http) {
    console.log("apiKey", this.apiKey);
  }
  
  fetch(symbol:string):any {
    let params = new URLSearchParams();
    params.set('symbol', symbol);

    // this.searchSymbol = symbol;
    // searchApi = this.url;
    console.log('fetch arg', symbol);


    return this.http.get('/api/fetchArticles', {search: params})
      .map(res => res.json()) // convert to JSON
      // .map(x => x.filter(y => y.name)); // Remove invalid stocks (no name)
  }
}

