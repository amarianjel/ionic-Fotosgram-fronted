import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string | any;
  private usuario: Usuario = {};

  constructor( private http: HttpClient, private storage: Storage ) {
    // README: Funcion que da problemas cuando inicia la app, pero se soluciono con un try catch del storage
    this.storage.create();
  }

  login( email: string, password: string ) {

    const data = { email, password };

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/login`, data )
        .subscribe( async( resp:any ) => {
          console.log(resp);

          if ( resp['ok'] ) {
            await this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }

  
  registro( usuario: Usuario ) {
    return new Promise( resolve => {
      this.http.post(`${ URL }/user/create`, usuario ).subscribe( async( resp: any ) => {
        console.log(resp);

        if ( resp['ok'] ) {
          await this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }
}
