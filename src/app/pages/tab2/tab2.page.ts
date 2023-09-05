import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { UserPhoto } from 'src/app/interfaces/interfaces';
import { Directory, Filesystem } from '@capacitor/filesystem';

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


  async procesarImagen( image: Photo) {

    const fileName = new Date().getTime() + '.jpg';
    const base64Data = await this.readAsBase64( image );

    const savedFile = await Filesystem.writeFile({
      path : fileName,
      data: base64Data,
      directory: Directory.Data
    })

    const readFile = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    })

    //DONE: Toma la foto
    this.tempImages.unshift({
      filepath: "soon...",
      webviewPath: image.webPath,
      data: `data:image/jpg;base64, ${ readFile.data}`,
      name: 'f'
    })

    // README: Imagen
    const imagen: UserPhoto = {
      filepath: base64Data,
      webviewPath: image.webPath,
      data: `data:image/jpg;base64, ${ readFile.data}`,
      name: fileName
    }

    this.startUpload(imagen)
  }

  async startUpload( file: UserPhoto ){

    const response = await fetch( file.data! );
    const blob = await response.blob();
    const formData = new FormData();

    formData.append('image', blob, file.name);

    this.postsService.subirImagen( formData )
  }

  // README: Codigo para complementar
  async readAsBase64( img: any ){
    //+ Obtengo la fotografía, léala como un blob y luego conviértala al formato base64.
    const response = await fetch( img.webPath! );
    const blob = await response.blob();
    
    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = reject;
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
}