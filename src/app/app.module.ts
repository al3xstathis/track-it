import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';
import {environment, firebaseConfig} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {ServiceWorkerModule} from '@angular/service-worker';
import {HTTP} from '@ionic-native/http/ngx';
import {AvsService} from '../services/avs.service';
import {ContentService} from '../services/content.service';
import {AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics';
// import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';

// let signInFlow = 'popup';
// For iOS full screen apps we use the redirect auth mode.


// // @ts-ignore
// const firebaseUiAuthConfig: firebaseui.auth.Config = {
//     signInFlow : 'popup',
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         {
//             requireDisplayName: false,
//             provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
//         },
//     ],
//     // tosUrl: '<your-tos-link>',
//     // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
//     credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
// };


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({swipeBackEnabled: false}),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment),
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence({synchronizeTabs: true}),
        FormsModule,
        RouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AngularFireAnalyticsModule,
        // FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        AvsService,
        ContentService,
        HTTP,
        HttpClientModule,
        GooglePlus,
        AngularFireAuthModule,
        ScreenTrackingService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // constructor(private platform: Platform) {
    //     if (this.platform.is('pwa')) {
    //         signInFlow = 'redirect';
    //         console.log('ios PWA');
    //     }
    // }
}


