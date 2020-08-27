import {Component, OnInit} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public isDark = false;
    public events: any = [
        {
            title: 'Men\'s Calculators',
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
            title: 'Women\'s Calculators',
            children: [
                {
                    title: 'Heptathlon',
                    url: '/heptathlon',
                },
                {
                    title: 'Indoor Pentathlon',
                    url: '/f-pentathlon'
                }
            ]
        },
        {
            title: 'IAAF Points Calculator',
            url: '/iaaf'
        },
        {
            title: 'Runways',
            url: '/runways'
        },

        {
            title: 'Saved Events',
            url: '/saved'
        },
        // {
        //     title: 'Unit Converter',
        //     url: '/unit-converter'
        // }
    ];


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fireAuth: AngularFireAuth,
        private router: Router,
        private menuCtrl: MenuController,
    ) {
        this.initializeApp();
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('ngsw-worker.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(err => {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        } else {
            console.log('No service-worker on this browser');
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleBlackTranslucent();
            this.splashScreen.hide();
            this.statusBar.overlaysWebView(false);
            this.menuCtrl.close();
            this.menuCtrl.enable(false);
            this.isDark = !!localStorage.getItem('is-dark');
            this.darkModeToggle(this.isDark);
            this.redirectAuth();
        });

    }

    redirectAuth() {
        this.fireAuth
            .onAuthStateChanged((user) => {
                if (user) {
                    this.router.navigateByUrl('decathlon');
                    this.menuCtrl.enable(true);
                } else {
                    this.router.navigateByUrl('register');
                    this.menuCtrl.enable(false);
                }
            });
    }


    darkModeToggle(isDark) {
        if (isDark) {
            document.getElementById('main-body').classList.add('dark-mode');
            document.getElementById('main-body').classList.remove('light-mode');
            localStorage.setItem('is-dark', '1');
        } else {
            document.getElementById('main-body').classList.add('light-mode');
            document.getElementById('main-body').classList.remove('dark-mode');
            localStorage.removeItem('is-dark');
        }
    }

    ngOnInit() {
    }
}
