import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IonRouterOutlet, Platform} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  appleDevice: boolean;

  constructor(public auth: AuthService,
              private platform: Platform) {
    this.appleDevice = this.platform.is('ios');
  }

  registerEmail() {
    this.auth.SignUp(this.email, this.password).then( res => {
      console.log(res);
    });
  }

  registerGoogle() {
    this.auth.SignInWithGoogle();
  }
  registerApple() {
    this.auth.signInWithApple();
  }


  ngOnInit() {

  }

}
