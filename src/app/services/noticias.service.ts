import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiurl = environment.apiurl;
const headers = new HttpHeaders({
'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

    private ejecutarQuery<T>(query: string) {
      query = apiurl + query;
      return this.http.get<T>(query, {headers});
    }

    getTopHEadLines() {
      return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=mx`);
      // return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/everything?q=bitcoin&from=2020-01-19&sortBy=publishedAt&apiKey=${apiKey}`);
    }

    getTopHEadLinesCategoria(categoria: string) {
      return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=mx&category=${categoria}`);
    // return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=0cfd5b8d2642466aaa3925f262cfffb4`);
    }
  }


