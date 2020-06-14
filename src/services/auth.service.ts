import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import * as firebase from "firebase/app";
import "firebase/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import { GooglePlus} from "@ionic-native/google-plus/ngx";
import { Platform} from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth,
              private db: AngularFirestore,
              private gplus: GooglePlus,
              private platform: Platform,) {
    this.userData = fireAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.fireAuth
        .createUserWithEmailAndPassword(email,password)
        .then( async res => {
          console.log('Successfully signed up!', res);
           await this.db.collection('users').doc(res.user.uid).set({
              email: email,
              UID: res.user.uid
          }).then()
        })
        .catch(error => {
          console.log( error.message);
        })

  }

  SignIn(email: string, password: string) {
    this.fireAuth
        .signInWithEmailAndPassword(email,password)
        .then(res => {
          console.log('Successfully signed in!', res);
        })
        .catch(error => {
          console.log('Something is wrong: ', error.message);
        })
  }
  SignInWithGoogle() {
      if(this.platform.is('cordova')) {
          this.nativeGoogleLogin();
      } else {
          this.webGoogleLogin();
      }
  }

  SignOut() {
    this.fireAuth
        .signOut();
  }
  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
      try {
          const gplusUser = await this.gplus.login({
              'webClientId': '893672772382-niavl3soo5g7jr8hh0qo0ig9e1fs7fhc.apps.googleusercontent.com',
              'offline': true,
              'scope': 'profile email'
          })

          return await this.fireAuth.signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
          )
      } catch (err) {
          console.log(err);
      }
  }

  async webGoogleLogin(): Promise<void> {
      try {
          const provider = new firebase.auth.GoogleAuthProvider();

          await this.fireAuth.signInWithPopup(provider)
              .then(res => {
                  console.log('Successfully signed in with Google!', res);
                  this.db.collection('users').doc(res.user.uid).set({
                      email: res.user.email,
                      UID: res.user.uid
              }).then()

          })

      } catch(err) {
          console.log(err);
      }
  }
}
