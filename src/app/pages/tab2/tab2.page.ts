import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
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
      console.log(coords);
      this.post.coords = coords;

    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
  }

  camara() {

    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.CAMERA
    // };

    // this.procesarImagen( options );

  }

  libreria() {

    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };

    // this.procesarImagen( options );

  }


  procesarImagen( options: any ) {

    // this.camera.getPicture(options).then( ( imageData ) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):

    //    const img = window.Ionic.WebView.convertFileSrc( imageData );

    //   this.postsService.subirImagen( imageData );
    //   this.tempImages.push( img );

    //  }, (err) => {
    //   // Handle error
    //  });
  }
}
