import {Component, OnDestroy, OnInit} from '@angular/core';
import {MHeptathlonClass} from '../../models/m-Heptathlon.class';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {ContentService} from '../../services/content.service';

@Component({
    selector: 'app-m-heptathlon',
    templateUrl: './m-heptathlon.page.html',
    styleUrls: ['./m-heptathlon.page.scss'],
})
export class MHeptathlonPage implements OnInit, OnDestroy {

    dataIn = new MHeptathlonClass();
    dataOut = new MHeptathlonClass();

    constructor(private alertCtrl: AlertController,
                private db: AngularFirestore,
                private auth: AngularFireAuth,
                private toastController: ToastController,
                private router: Router) {
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your settings have been saved.',
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
                                time: firebase.firestore.FieldValue.serverTimestamp(),
                                title: data.event,
                                sixty: this.dataIn.sixty,
                                lj: this.dataIn.lj,
                                sp: this.dataIn.sp,
                                hj: this.dataIn.hj,
                                hurdles: this.dataIn.hurdles,
                                pv: this.dataIn.pv,
                                thousand: this.dataIn.thousand,
                                dayOne: this.dataOut.dayOneScore,
                                dayTwo: this.dataOut.dayTwoScore,
                                total: this.dataOut.totalScore,
                                type: 'mHep',
                                typeFull: 'Men Heptathlon'
                            })
                                .catch(error => {
                                    console.log(error);
                                });
                            await this.presentToast();
                        } else {
                            // add new
                            await this.db.collection('users').doc(id).collection('saved').add({
                                time: firebase.firestore.FieldValue.serverTimestamp(),
                                title: data.event,
                                sixty: this.dataIn.sixty,
                                lj: this.dataIn.lj,
                                sp: this.dataIn.sp,
                                hj: this.dataIn.hj,
                                hurdles: this.dataIn.hurdles,
                                pv: this.dataIn.pv,
                                thousand: this.dataIn.thousand,
                                dayOne: this.dataOut.dayOneScore,
                                dayTwo: this.dataOut.dayTwoScore,
                                total: this.dataOut.totalScore,
                                type: 'mHep',
                                typeFull: 'Men Heptathlon'
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
                if (key !== 'thousand') {
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
        return (value === 'sixty' || value === 'lj' || value === 'sp' || value === 'hj');
    }

    private isDayTwo(value: string) {
        return (value === 'hurdles' || value === 'pv' || value === 'thousand');
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
            time: firebase.firestore.FieldValue.serverTimestamp(),
            title: this.dataIn.title,
            sixty: this.dataIn.sixty,
            lj: this.dataIn.lj,
            sp: this.dataIn.sp,
            hj: this.dataIn.hj,
            hurdles: this.dataIn.hurdles,
            pv: this.dataIn.pv,
            thousand: this.dataIn.thousand,
            dayOne: this.dataOut.dayOneScore,
            dayTwo: this.dataOut.dayTwoScore,
            total: this.dataOut.totalScore,
            type: 'mHep',
            typeFull: 'Men Heptathlon'
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
        ContentService.mHepValues = null;
    }

    ngOnDestroy() {
        this.clearAll();
    }

    async ngOnInit() {

        this.updateScore();

        if (ContentService.mHepValues != null) {
            this.dataIn.sixty = ContentService.mHepValues.sixty;
            this.dataIn.lj = ContentService.mHepValues.lj;
            this.dataIn.sp = ContentService.mHepValues.sp;
            this.dataIn.hj = ContentService.mHepValues.hj;
            this.dataIn.hurdles = ContentService.mHepValues.hurdles;
            this.dataIn.pv = ContentService.mHepValues.pv;
            this.dataIn.thousand = ContentService.mHepValues.thousand;
            this.dataIn.id = ContentService.mHepValues.id;
            this.dataIn.title = ContentService.mHepValues.title;
        }
    }

}
