import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, ToastController} from "@ionic/angular";
import {animate} from "@angular/animations";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {EventInterface} from "../../models/event.interface";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

export interface RunwayInterface {
  event: string;
  runway: string;
}

@Component({
  selector: 'app-runways',
  templateUrl: './runways.page.html',
  styleUrls: ['./runways.page.scss'],
})
export class RunwaysPage implements OnInit {
  private runwaysCollection: AngularFirestoreCollection<RunwayInterface>;
  runways:Observable<any>;

  constructor(public toastController: ToastController,
              public actionSheetController: ActionSheetController,
              private db: AngularFirestore,
              private user: AngularFireAuth,
              public alert: AlertController) {
      this.init();
  }


  async presentActionSheet() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Events',
      cssClass: 'action',
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
      cssClass: 'alert',
      inputs: [
        {
          name: 'runway',
          placeholder: 'Input runway:'
        },
        {
          name: 'steps',
          placeholder: 'Input steps:'
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
              title: event,
              event: eventName,
              runway: data.runway,
              steps: data.steps
            }).catch(error => {
                  console.log(error);
                });
            // await this.refresh(event);
            await this.presentToast()
          }

        }
      ]
    });

    await alert.present();
  }

  async init() {

      const id = (await this.user.currentUser).uid;

      this.runwaysCollection = this.db.collection('users').doc(id).collection<RunwayInterface>('runways');
      this.runways = this.runwaysCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as RunwayInterface;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
      )
  }

  async edit(title: string, event: string, runway: string, steps: string, id: string ) {
    const alert = await this.alert.create({
      header: 'Edit '+event+' runway',
      cssClass: 'alert',
      inputs: [
        {
          name: 'runway',
          placeholder: 'Input runway:',
          value: runway
        },
        {
          name: 'steps',
          placeholder: 'Input steps:',
          value: steps
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async data => {
            const id1 = (await this.user.currentUser).uid;
            await this.db.collection('users').doc(id1).collection('runways').doc(id).delete();
          }
        },
        {
          text: 'Save',
          handler: async data => {
            const id1 = (await this.user.currentUser).uid;
            await this.db.collection('users').doc(id1).collection('runways').doc(id).set({
              title: title,
              event: event,
              runway: data.runway,
              steps: data.steps

            }).catch(error => {
              console.log(error);
            });
            // await this.refresh(event);
            await this.presentToast()
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
