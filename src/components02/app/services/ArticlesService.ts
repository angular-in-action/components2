// a service to fetch articles
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

@Injectable()
export class ArticlesService {

  // TS shortcut "public" to put http on this
  constructor(public http:Http) {
  }
  
  fetch(symbol:string):any {
    let params = new URLSearchParams();
    params.set('symbol', symbol);

    return this.http.get('/api/fetchArticles', {search: params})
      .map(res => res.json()) // convert to JSON
  }
}

