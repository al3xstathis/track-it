import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar} from "@ionic-native/status-bar/ngx";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService} from "../services/auth.service";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {GooglePlus} from "@ionic-native/google-plus/ngx";


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


