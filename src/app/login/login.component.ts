import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public auth: AuthService) {

  }

  loginEmail() {
    this.auth.SignIn(this.email, this.password);
  }

  loginGoogle() {
    this.auth.SignInWithGoogle();
  }
  ngOnInit() {}

}
