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

  constructor( private http: HttpClient, private storage: Storage ) { }

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
    // README: Funcion que da problemas cuando inicia la app, pero se soluciono con un try catch del storage
    try{
      await this.storage.create();
      this.token = token;
      await this.storage.set('token', token);
      // return this.mensajes;
    }catch( err ){
      console.error('Error al cargar datos desde el almacenamiento:', err);
    }
  }
}
