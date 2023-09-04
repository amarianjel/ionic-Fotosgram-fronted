import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string | any;
  private usuario: Usuario = {};

  constructor( private http: HttpClient, private storage: Storage, private navCtrl: NavController ) {
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
      this.http.post(`${ URL }/user/create`, usuario ).subscribe( async( resp:any ) => {
  
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

  async cargarToken() {
    this.token = await this.storage.get('token') || null; //Para leerlo del storage
  }

  async validaToken(): Promise<boolean>{
    
    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    
    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/user/`, { headers })
        .subscribe(( resp:any ) => {

          if ( resp['ok'] ) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  getUsuario() {
    if ( !this.usuario._id ) {
      this.validaToken();
    }
    return { ...this.usuario };
  }

  actualizarUsuario( usuario: Usuario ) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise<boolean>( resolve => {
      this.http.post(`${ URL }/user/update`, usuario, { headers })
        .subscribe(( resp: any ) => {

          if ( resp['ok'] ) {
            this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  logout() {
    this.token   = null;
    this.usuario = {};
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
