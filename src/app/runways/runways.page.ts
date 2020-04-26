import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, ToastController} from "@ionic/angular";
import {animate} from "@angular/animations";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-runways',
  templateUrl: './runways.page.html',
  styleUrls: ['./runways.page.scss'],
})
export class RunwaysPage implements OnInit {
  public savedRunways = [];
  public id;

  constructor(public toastController: ToastController,public actionSheetController: ActionSheetController, private db: AngularFirestore, private user: AngularFireAuth, public alert: AlertController) {
      this.getSavedRunways();
  }


  async presentActionSheet() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Events',
      cssClass: 'action',
      animated: true,
      backdropDismiss: true,
      buttons: [{
        text: 'Long Jump',
        handler: () => {
          this.presentAlert('longJump','Long Jump')
        }
      }, {
        text: 'High Jump',
        handler: () => {
          this.presentAlert('highJump', 'High Jump')
        }
      }, {
        text: 'Triple Jump',
        handler: () => {
            this.presentAlert('tripleJump', 'Triple Jump')
        }
      }, {
        text: 'Javelin',
        handler: () => {
          this.presentAlert('javelin', 'Javelin')
        }
      }, {
          text: 'Blocks',
          handler: () => {
            this.presentAlert('blocks', 'Blocks')
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your runway has been saved.',
      duration: 2000
    });
    await toast.present();
  }

  async presentAlert(event: string, eventName: string) {
    const alert = await this.alert.create({
      header: 'Save '+eventName+' runway',
      inputs: [
        {
          name: 'runway',
          placeholder: 'Input runway'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async data => {
            const id1 = (await this.user.currentUser).uid;
            await this.db.collection('users').doc(id1).collection('runways').add({
              event: eventName,
              runway: data.runway
            }).catch(error => {
                  console.log(error);
                });
            await this.presentToast()
          }

        }
      ]
    });

    await alert.present();
  }

  async getSavedRunways() {

      const id = (await this.user.currentUser).uid;
      this.db.collection('users').doc(id)
          .collection('runways').get()
          .subscribe(data => {
            data.forEach(doc => {
              this.savedRunways.push(doc.data())
            })
          })
  }

  refresh(event) {
    this.savedRunways= [];
    this.getSavedRunways();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
  }

}
