import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Platform, ToastController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: Observable<firebase.User>;

    constructor(private fireAuth: AngularFireAuth,
                private db: AngularFirestore,
                private gplus: GooglePlus,
                private platform: Platform,
                private toastController: ToastController) {
        this.userData = fireAuth.authState;
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 3000
        });
        await toast.present();
    }

    SignUp(email: string, password: string) {
        return this.fireAuth
            .createUserWithEmailAndPassword(email, password)
            .then(async res => {
                await this.presentToast('Congrats! You\'ve signed up!');
                console.log('Successfully signed up!', res);
                await this.db.collection('users').doc(res.user.uid).set({
                    email,
                    UID: res.user.uid
                }).then();
            })
            .catch(async error => {
                await this.presentToast('There was a problem signing up, make sure the email' +
                    ' is valid and password is at least 6 characters');
                console.log(error.message);
            });
    }

    SignIn(email: string, password: string) {
        this.fireAuth
            .signInWithEmailAndPassword(email, password)
            .then(async res => {
                await this.presentToast('You\'ve signed in!');
                console.log('Successfully signed in!', res);
            })
            .catch(async error => {
                await this.presentToast('There was a problem signing in make sure the email' +
                    ' matches the password you originally registered with.');
                console.log('Something is wrong: ', error.message);
            });
    }

    SignInWithGoogle() {
        if (this.platform.is('cordova')) {
            this.nativeGoogleLogin();
        } else {
            this.webGoogleLogin();
        }
    }

    async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
        try {
            const gplusUser = await this.gplus.login({
                webClientId: '401315847279-rvgr22aob0cjktd0aepscviuocl59r18.apps.googleusercontent.com',
                offline: true,
                scope: 'profile email'
            });

            return await this.fireAuth.signInWithCredential(
                firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
            );
        } catch (err) {
            console.log(err);
        }
        await this.presentToast('You\'ve signed in with Google!');
    }

    async webGoogleLogin(): Promise<void> {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();

            await this.fireAuth.signInWithPopup(provider)
                .then(async res => {
                    await this.presentToast('You\'ve signed in with Google!');
                    console.log('Successfully signed in with Google!', res);
                    this.db.collection('users').doc(res.user.uid).set({
                        email: res.user.email,
                        UID: res.user.uid
                    }).then();

                });

        } catch (err) {
            console.log(err);
        }
    }

    async signInWithApple() {
        try {
            const provider = new firebase.auth.OAuthProvider('apple.com');
            await this.fireAuth.signInWithPopup(provider)
                .then(async res => {
                    await this.presentToast('You\'ve signed in with Apple!');
                    this.db.collection('users').doc(res.user.uid).set({
                        email: res.user.email,
                        UID: res.user.uid
                    }).then();
                });
        } catch (err) {
            console.log(err);
        }
    }

    SignOut() {
        this.fireAuth
            .signOut();
    }
}
