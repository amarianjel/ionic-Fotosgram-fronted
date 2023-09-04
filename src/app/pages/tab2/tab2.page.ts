import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserPhoto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: UserPhoto[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: '',
    posicion: false
  };

  constructor( private postsService: PostsService, private route: Router ) { }

  async crearPost() {

    console.log(this.post);
    const creado = await this.postsService.crearPost( this.post );

    this.post = {
      mensaje: '',
      coords: '',
      posicion: false
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  async getGeo() {

    if ( !this.post.posicion ) {
      this.post.coords = '';
      return;
    }

    this.cargandoGeo = true;

    const coordinates = await Geolocation.getCurrentPosition().then(( geolocation: any ) => {
      this.cargandoGeo = false;
      
      const coords = `${ geolocation.coords.latitude },${ geolocation.coords.longitude }`;
      this.post.coords = coords;

    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
  }

  async camara() {

    const image = await Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.procesarImagen( image )
  }

  async libreria() {

    const image = await Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    this.procesarImagen( image )
  }


  procesarImagen( image: any) {
    //DONE: Toma la foto
    this.tempImages.unshift({
      filepath: "soon...",
      webviewPath: image.webPath
    })
  }
}
