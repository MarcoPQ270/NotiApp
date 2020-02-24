import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
noticias: Article[] = [];
  constructor(private NoticiasServices: NoticiasService) {

  }
  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.NoticiasServices.getTopHEadLines().subscribe(respuesta => {
      //  console.log('para ti',  respuesta);
      if (respuesta.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
      }
      this.noticias.push(...respuesta.articles);

      if (event) {
          event.target.complete();
        }

    });
  }
}
