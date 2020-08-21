import {Component, OnDestroy, OnInit} from '@angular/core';
import {DecathlonClass} from '../../models/decathlon.class';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {ContentService} from '../../services/content.service';

@Component({
  selector: 'app-decathlon',
  templateUrl: './decathlon.page.html',
  styleUrls: ['./decathlon.page.scss'],
})
export class DecathlonPage implements OnInit, OnDestroy {
  dataIn  = new DecathlonClass();
  dataOut = new DecathlonClass();

  constructor(private alertCtrl: AlertController,
              private db: AngularFirestore,
              private auth: AngularFireAuth,
              private toastController: ToastController,
              private router: Router) {
  }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your event has been saved.',
            duration: 2000
        });
        await toast.present();
    }

    async presentPrompt() {
      const alert = await this.alertCtrl.create({
        header: 'Save',
        cssClass: 'alert',
        inputs: [
          {
            name: 'event',
            placeholder: 'Name of Event'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: async data => {

                // check if any of the fields have not been defined and initialize them with "0" to post to firestore

                for (const key in this.dataIn) {
                    if (this.dataIn.hasOwnProperty(key)) {
                    if (this.dataIn[key] === undefined) {
                        this.dataIn[key] = '0';
                    }
                    }
                }

                const id = (await this.auth.currentUser).uid;


                // edit
                if (this.dataIn.id) {
                    await this.db.collection('users').doc(id).collection('saved').doc(this.dataIn.id).set({
                        time: firebase.database.ServerValue.TIMESTAMP,
                        title: data.event,
                        hundred: this.dataIn.hundred,
                        lj: this.dataIn.lj,
                        sp: this.dataIn.sp,
                        hj: this.dataIn.hj,
                        four: this.dataIn.four,
                        hurdles: this.dataIn.hurdles,
                        dt: this.dataIn.dt,
                        pv: this.dataIn.pv,
                        jt: this.dataIn.jt,
                        fifteen: this.dataIn.fifteen,
                        dayOne: this.dataOut.dayOneScore,
                        dayTwo: this.dataOut.dayTwoScore,
                        total: this.dataOut.totalScore,
                        type: 'mDec',
                        typeFull: 'Decathlon'
                    })
                        .catch(error => {
                            console.log(error);
                        });
                    await this.presentToast();
                } else {
                    // add new
                    await this.db.collection('users').doc(id).collection('saved').add({
                        time: firebase.database.ServerValue.TIMESTAMP,
                        title: data.event,
                        hundred: this.dataIn.hundred,
                        lj: this.dataIn.lj,
                        sp: this.dataIn.sp,
                        hj: this.dataIn.hj,
                        four: this.dataIn.four,
                        hurdles: this.dataIn.hurdles,
                        dt: this.dataIn.dt,
                        pv: this.dataIn.pv,
                        jt: this.dataIn.jt,
                        fifteen: this.dataIn.fifteen,
                        dayOne: this.dataOut.dayOneScore,
                        dayTwo: this.dataOut.dayTwoScore,
                        total: this.dataOut.totalScore,
                        type: 'mDec',
                        typeFull: 'Decathlon'
                    })
                        .catch(error => {
                            console.log(error);
                        });
                    await this.presentToast();
                }
            }
          }
        ]
      });
      await alert.present();
}

    updateScore() {
      for (const key in this.dataIn) {
          if (this.dataIn.hasOwnProperty(key)) {
                  if (key !== 'fifteen') {
                      const parse = Number(this.dataIn[key]);
                      if (parse !== 0.00) {
                          let eventScore = this.dataIn.eventScore(key, parse);
                          if (isNaN(eventScore)) {
                              eventScore = 0;
                          }
                          this.dataOut[key] = eventScore;
                      } else {
                          this.dataOut[key] = 0;
                      }
                  } else {
                      if (this.dataIn[key] !== '' && this.dataIn[key] !== '0.00') {
                          let eventScore = this.dataIn.eventScore(key, this.dataIn[key]);
                          if (isNaN(eventScore)) {
                              eventScore = 0;
                          }
                          // @ts-ignore
                          this.dataOut[key] = eventScore;
                      } else {
                          // @ts-ignore
                          this.dataOut[key] = 0;
                      }
                  }
          }
      }
      this.calculateDayOne();
      this.calculateDayTwo();
      this.calculateTotal();
  }

    private isDayOne(value: string) {
        return (value === 'hundred' || value === 'lj' || value === 'sp' || value === 'hj' || value === 'four' );
    }

    private isDayTwo(value: string) {
        return (value === 'hurdles' || value === 'dt' || value === 'pv' || value === 'jt' || value === 'fifteen' );
    }

    calculateDayOne() {
      let dayOneScore = 0;
      for (const key in this.dataIn) {
          if (this.dataIn.hasOwnProperty(key)) {
              if (this.isDayOne(key)) {
                  dayOneScore += this.dataOut[key];
              }
          }
      }
      this.dataOut.dayOneScore = dayOneScore.toString();
    }

    calculateDayTwo() {
      let dayTwoScore = 0;
      for (const key in this.dataIn) {
          if (this.dataIn.hasOwnProperty(key)) {
              if (this.isDayTwo(key)) {
                  dayTwoScore += this.dataOut[key];
              }
          }
      }
      this.dataOut.dayTwoScore = dayTwoScore.toString();
    }

    calculateTotal() {
      this.dataOut.totalScore = (Number(this.dataOut.dayOneScore) + Number(this.dataOut.dayTwoScore)).toString();
    }

    async save() {
        for (const key in this.dataIn) {
            if (this.dataIn.hasOwnProperty(key)) {
                if (this.dataIn[key] === undefined) {
                    this.dataIn[key] = '0';
                }
            }
        }
        const id = (await this.auth.currentUser).uid;
        // edit
        await this.db.collection('users').doc(id).collection('saved').doc(this.dataIn.id).set({
                time: firebase.database.ServerValue.TIMESTAMP,
                title: this.dataIn.title,
                hundred: this.dataIn.hundred,
                lj: this.dataIn.lj,
                sp: this.dataIn.sp,
                hj: this.dataIn.hj,
                four: this.dataIn.four,
                hurdles: this.dataIn.hurdles,
                dt: this.dataIn.dt,
                pv: this.dataIn.pv,
                jt: this.dataIn.jt,
                fifteen: this.dataIn.fifteen,
                dayOne: this.dataOut.dayOneScore,
                dayTwo: this.dataOut.dayTwoScore,
                total: this.dataOut.totalScore,
                type: 'mDec',
                typeFull: 'Decathlon'
            })
                .catch(error => {
                    console.log(error);
                });
        await this.clearAll();
        await this.router.navigateByUrl('saved');
        await this.presentToast();
    }

    clear() {
      for (const key in this.dataIn) {
          if (this.dataIn.hasOwnProperty(key)) {
              if (key !== 'id' && key !== 'title') {
                  this.dataIn[key] = '';
              }
          }
      }
    }

    async clearAll() {
        ContentService.mDecValues = null;
    }

    ngOnDestroy() {
      this.clearAll();
    }

  async ngOnInit() {
      this.updateScore();

      if (ContentService.mDecValues != null) {
              this.dataIn.hundred = ContentService.mDecValues.hundred;
              this.dataIn.lj = ContentService.mDecValues.lj;
              this.dataIn.sp = ContentService.mDecValues.sp;
              this.dataIn.hj = ContentService.mDecValues.hj;
              this.dataIn.four = ContentService.mDecValues.four;
              this.dataIn.hurdles = ContentService.mDecValues.hurdles;
              this.dataIn.dt = ContentService.mDecValues.dt;
              this.dataIn.pv = ContentService.mDecValues.pv;
              this.dataIn.jt = ContentService.mDecValues.jt;
              this.dataIn.fifteen = ContentService.mDecValues.fifteen;
              this.dataIn.id = ContentService.mDecValues.id;
              this.dataIn.title = ContentService.mDecValues.title;
          // console.log(ContentService.getDecContent());
      }
  }

}
