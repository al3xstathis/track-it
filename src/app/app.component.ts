import { Component, OnInit } from '@angular/core';

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
        }
      ]
    },
    {
      title: "Women's Calculators",
      children: [
        {
          title: 'Heptathlon',
          url: '/heptathlon',
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
    }
  ]
  public men = [
    {
      title: 'Decathlon',
      url: '/decathlon'
    }
  ]
  public women = [
    {
      title: 'Heptathlon',
      url: '/heptathlon',
    }
  ]
  public appPages = [
    {
      title: 'Decathlon',
      url: '/decathlon',
    },
    {
      title: 'Heptathlon',
      url: '/heptathlon',
    },
    {
      title: 'Runways',
      url: '/runways',
    },
    {
      title: 'Saved Series',
      url: '/saved',
    }
  ];




  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#ffffff');
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
                this.router.navigateByUrl('login');
                this.menuCtrl.enable(false);
               }
          })
          .then(res => {})
  }

  ngOnInit() {
  }
}
