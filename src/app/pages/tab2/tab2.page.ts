import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

@ViewChild( IonSegment, {static: true}) segment: IonSegment;
categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', ];
noticias: Article [] = [];

constructor(private NoticiasServices: NoticiasService) {

}

ngOnInit() {
  // this.segment.value = this.categorias[0];
  this.segment.value = this.categorias[0];
  this.CargarNoticias( this.categorias[0]);
}
ionViewDidEnter() {
  // Probar en el ionViewDidEnter
  this.segment.value = this.categorias[0];
}

cambioCategoria(event) {
  this.noticias = [];

  this.CargarNoticias( event.detail.value);
}


CargarNoticias(categoria: string, event?) {

  this.NoticiasServices.getTopHEadLinesCategoria(categoria).subscribe(respuesta => {
    // console.log('Encabezados', respuesta);
    this.noticias.push(...respuesta.articles);
    if ( event ) {
      event.target.complete();
    }
    });
}

loadData(event) {
  this.CargarNoticias(this.segment.value, event);
}

}
