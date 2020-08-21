import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(public auth: AuthService) {
  }

  registerEmail() {
    this.auth.SignUp(this.email, this.password);
  }

  registerGoogle() {
    this.auth.SignInWithGoogle();
  }


  ngOnInit() {

  }

}
