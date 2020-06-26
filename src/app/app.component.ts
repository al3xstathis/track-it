import {Component, Inject, OnInit} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public events = [
    {
      title: "Men's Calculators",
      children: [
        {
          title: 'Decathlon',
          url: '/decathlon'
        },
        {
          title: 'Indoor Heptathlon',
          url: '/m-heptathlon'
        }
      ]
    },
    {
      title: "Women's Calculators",
      children: [
        {
          title: 'Heptathlon',
          url: '/heptathlon',
        },
        {
          title: "Indoor Pentathlon",
          url:'/f-pentathlon'
        }
      ]
    },
    {
      title: "Runways",
      url: '/runways'
    },
    {
      title: "Saved Series",
      url: '/saved'
    },
    {
      title: "Unit Converter",
      url: '/unit-converter'
    }
  ]




  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl: MenuController,
    // private localStorage: ,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.redirectAuth();
    });

  }

  redirectAuth() {
      this.fireAuth
          .onAuthStateChanged((user)=> {
              if (user) {
                this.router.navigateByUrl('decathlon');
                this.menuCtrl.enable(true);
              } else {
                this.router.navigateByUrl('register');
                this.menuCtrl.enable(false);
               }
          })
          .then(res => {})
  }




  ngOnInit() {
  }
}
