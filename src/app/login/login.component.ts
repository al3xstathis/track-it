import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AlertController, IonRouterOutlet, Platform} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    appleDevice: boolean;

    constructor(public auth: AuthService,
                private fireAuth: AngularFireAuth,
                private alertCtrl: AlertController,
                private router: IonRouterOutlet,
                private platform: Platform) {
        this.appleDevice = this.platform.is('ios');
    }

    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Password',
            message: 'An email has been sent to ' + this.email + ' in order to reset your password<br>' +
                'Follow the instructions and once you are done come back here and sign in.',
            cssClass: 'alert',

            buttons: [
                {
                    text: 'Close',
                    role: 'cancel'
                }],
        });

        await alert.present();
    }

    loginEmail() {
        this.auth.SignIn(this.email, this.password);
    }

    forgotPass() {
        this.fireAuth.sendPasswordResetEmail(this.email).then(res => {
            this.presentAlert();
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    loginGoogle() {
        this.auth.SignInWithGoogle();
    }

    loginApple() {
        this.auth.signInWithApple();
    }
    ngOnInit() {

    }

}
