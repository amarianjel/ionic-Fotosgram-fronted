import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor( private http: HttpClient, private usuarioService: UsuarioService, private loadingCtrl: LoadingController ) { }

  getPosts( pull: boolean = false ) {

    if ( pull ) {
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${ URL }/posts/?pagina=${ this.paginaPosts }`);
  }

  crearPost( post: any ) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.post(`${ URL }/posts`, post, { headers })
        .subscribe(( resp: any ) => {

          this.nuevoPost.emit( resp['post'] );
          resolve(true);
        });
    });
  }

  async subirImagen( formData: FormData ) {

    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    this.http.post(`${ URL }/posts/upload`, formData, { headers }).pipe(finalize(() => {
      loading.dismiss();
    })).subscribe(( resp: any ) => {
      if(resp['success']){
        console.log("File upload COMPLETE");
      }else{
        console.log("File upload FAILED");
      }
    })
  }
}