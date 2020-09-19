import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public isDark = false;

  constructor(private alert: AlertController,
              private auth: AuthService) {
    this.isDark = !!localStorage.getItem('is-dark');
  }

  ngOnInit() {
  }
  async logout() {
    const alert = await this.alert.create({
      header: 'Are you sure you want to logout?',
      cssClass: 'alert',
      buttons: [
        {
          text: 'Logout',
          handler: data => {
            this.auth.SignOut();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();

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

}
