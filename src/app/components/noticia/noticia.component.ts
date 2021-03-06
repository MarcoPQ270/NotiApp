import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalServicesService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
@Input() noticia: Article;
@Input() index: number;
@Input() enFavoritos;
  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private datalocalservices: DataLocalServicesService) { }

  ngOnInit() {}

  abrirNoticia() {
    // console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

 async lanzarMenu() {

let guardarBorrarbtn;

if (this.enFavoritos) {
      guardarBorrarbtn = {
        text: 'Borrar',
        icon: 'trash-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.datalocalservices.borrarFavorito(this.noticia);
        }
      };
    } else {
      guardarBorrarbtn = {
        text: 'Favorito',
        icon: 'star-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.datalocalservices.guardarnoticia(this.noticia);
        }
      };
    }

const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url);
        }
      },
      guardarBorrarbtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
await actionSheet.present();
  }
}
