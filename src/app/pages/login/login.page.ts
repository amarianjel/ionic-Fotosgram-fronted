import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  @ViewChild('slidePrincipal') slides: Swiper | any;

  loginUser = {
    email: 'test1@gmail.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email: 'test@gmail.com',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor( private usuarioService: UsuarioService, private navCtrl: NavController, private uiService: UiServiceService ) {}

  ionViewDidEnter() {
    this.slides.nativeElement.swiper.allowTouchMove = false   // Bloquear deslizamiento
  }

  async login( fLogin: NgForm ){

    if ( fLogin.invalid ) { return; }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }
  }

  async registro( fRegistro: NgForm ){
    
    if ( fRegistro.invalid ) { return; }

    const valido = await this.usuarioService.registro( this.registerUser );
    
    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
    }
  }

  //README: Lo dejare desbloqueado por que se ve mas bonito
  mostrarRegistro() {
    this.slides.nativeElement.swiper.allowTouchMove = true
    this.slides.nativeElement.swiper.slideTo(0);
  }

  mostrarLogin() {
    this.slides.nativeElement.swiper.allowTouchMove = true
    this.slides.nativeElement.swiper.slideTo(1);
  }
}
