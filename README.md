<div align="center">

#  [Fotosgram](https://ionicframework.com/) &middot; [<img src="https://i.postimg.cc/wT4x8tWS/codepenblanco.png" alt="LinkedIn" class="footer-nav__link-image" height="30px" />](https://codepen.io/amarianjel/)   [<img src="https://i.postimg.cc/5NBMxTJX/github.png" alt="GitHub" class="footer-nav__link-image" height="30px" />](https://github.com/amarianjel)   [<img src="https://i.postimg.cc/1Xj3mL3G/github-Pages-blanco.png" alt="GitHub" class="footer-nav__link-image" height="70px" style="margin-bottom: -20px;"/>](https://amarianjel.github.io/Portfolio/)  [<img src="https://i.postimg.cc/J7BLFtdc/linkedin.png" alt="LinkedIn" class="footer-nav__link-image" height="30px" />](https://www.linkedin.com/in/amarianjel/)   [<img src="https://i.postimg.cc/1zqYRTyp/facebook.png" alt="LinkedIn" class="footer-nav__link-image" height="30px" />](https://www.facebook.com/Abraham13071993/)   [<img src="https://i.postimg.cc/sfJtqS4W/instagram.png" alt="Instagram" class="footer-nav__link-image" height="30px" />](https://www.instagram.com/abr_marianjel/)
[![forthebadge](https://img.shields.io/badge/Made%20with-Ionic-blue.svg)](https://ionicframework.com/)
![Quicktype](https://img.shields.io/badge/Quicktype-%E2%9A%99%EF%B8%8F-orange)
[![forthebadge](https://img.shields.io/badge/Angular-%F0%9F%8C%8D-red.svg)](https://angular.io/)
![Android](https://img.shields.io/badge/Android-%F0%9F%93%B1-brightgreen)
![InAppBrowser](https://img.shields.io/badge/InAppBrowser-%F0%9F%8C%8F%F0%9F%93%B6-yellow)
![Capacitor](https://img.shields.io/badge/Capacitor-%F0%9F%94%8C-blueviolet)
![Social Sharing Plugin](https://img.shields.io/badge/Social%20Sharing%20Plugin-%E2%86%95%EF%B8%8F%F0%9F%94%BD-lightgrey)

</div>

<div>
  <p align="center">
    <img src="https://i.postimg.cc/wMRkmnnQ/ionic.png" alt="Logo Node">
  </p>
</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 👨‍💻 Tecnologías Usadas 👨‍💻
<table align="center">
  <thead>
    <tr>
      <th>Node</th>
      <th>Ts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://i.postimg.cc/mDcHQN1y/Node.png" width="150px" />
      </td>
      <td>
        <img src="https://i.postimg.cc/MH7XDs6V/Ts.png" width="150px" />
      </td>
    </tr>
  </tbody>
</table>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Migraciones

Swiper
```npm install swiper@latest```
Next, we need to add the CUSTOM_ELEMENTS_SCHEMA, which tells Angular that we will be using custom elements. This can be done in either app.module.ts, or the module file for the component where you will be using Swiper.


```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [..., CUSTOM_ELEMENTS_SCHEMA]
});
```
Finally, we need to call Swiper's register function to globally register Swiper's custom elements. This should only be done once, so place it in app.component.ts.
```ts
import { register } from 'swiper/element/bundle';

register();

@Component({
  ...
})
```
From there, we just have to replace ion-slides elements with swiper-container and ion-slide elements with swiper-slide. Note that these custom elements do not need to be imported, as calling register tells Angular about them on its own.
```html
<swiper-container>
  <swiper-slide>Slide 1</swiper-slide>
  <swiper-slide>Slide 2</swiper-slide>
  <swiper-slide>Slide 3</swiper-slide>
</swiper-container>
```

### Librerias
[Geolocalización](https://ionicframework.com/docs/native/geolocation)
[Camara](https://ionicframework.com/docs/native/camera)
[FileSystem](https://capacitorjs.com/docs/apis/filesystem)