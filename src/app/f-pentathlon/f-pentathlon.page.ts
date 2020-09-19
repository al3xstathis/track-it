import {Component, OnDestroy, OnInit} from '@angular/core';
import {FPentathlonClass} from '../../models/f-Pentathlon.class';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ContentService} from '../../services/content.service';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
    selector: 'app-f-pentathlon',
    templateUrl: './f-pentathlon.page.html',
    styleUrls: ['./f-pentathlon.page.scss'],
})
export class FPentathlonPage implements OnInit, OnDestroy {

    dataIn = new FPentathlonClass();
    dataOut = new FPentathlonClass();

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
        toast.present();
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
                                title: data.event,
                                time: firebase.firestore.FieldValue.serverTimestamp(),
                                lj: this.dataIn.lj,
                                sp: this.dataIn.sp,
                                hj: this.dataIn.hj,
                                hurdles: this.dataIn.hurdles,
                                eight: this.dataIn.eight,
                                dayOne: this.dataOut.dayOneScore,
                                dayTwo: this.dataOut.dayTwoScore,
                                total: this.dataOut.totalScore,
                                type: 'fPent',
                                typeFull: 'Pentathlon'
                            })
                                .catch(error => {
                                    console.log(error);
                                });
                            await this.presentToast();
                        } else {
                            // add new event
                            await this.db.collection('users').doc(id).collection('saved').add({
                                title: data.event,
                                time: firebase.firestore.FieldValue.serverTimestamp(),
                                lj: this.dataIn.lj,
                                sp: this.dataIn.sp,
                                hj: this.dataIn.hj,
                                hurdles: this.dataIn.hurdles,
                                eight: this.dataIn.eight,
                                dayOne: this.dataOut.dayOneScore,
                                dayTwo: this.dataOut.dayTwoScore,
                                total: this.dataOut.totalScore,
                                type: 'fPent',
                                typeFull: 'Pentathlon'
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
                if (key !== 'eight') {
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
                        this.dataOut[key] = eventScore.toString();
                    } else {
                        this.dataOut[key] = '0';
                    }
                }
            }
        }
        this.calculateTotal();
    }

    calculateTotal() {
        let totalScore = 0;
        for (const key in this.dataIn) {
            if (this.dataIn.hasOwnProperty(key)) {
                totalScore += Number(this.dataOut[key]);
            }
        }
        this.dataOut.totalScore = totalScore.toString();
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
            title: this.dataIn.title,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            lj: this.dataIn.lj,
            sp: this.dataIn.sp,
            hj: this.dataIn.hj,
            hurdles: this.dataIn.hurdles,
            eight: this.dataIn.eight,
            dayOne: this.dataOut.dayOneScore,
            dayTwo: this.dataOut.dayTwoScore,
            total: this.dataOut.totalScore,
            type: 'fPent',
            typeFull: 'Pentathlon'
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
        ContentService.fPentValues = null;
    }

    ngOnDestroy() {
        this.clearAll();
    }

    ngOnInit() {
        this.updateScore();
        if (ContentService.fPentValues != null) {
            this.dataIn.hurdles = ContentService.fPentValues.hurdles;
            this.dataIn.lj = ContentService.fPentValues.lj;
            this.dataIn.sp = ContentService.fPentValues.sp;
            this.dataIn.hj = ContentService.fPentValues.hj;
            this.dataIn.eight = ContentService.fPentValues.eight;
            this.dataIn.id = ContentService.fPentValues.id;
            this.dataIn.title = ContentService.fPentValues.title;

            // console.log(ContentService.getHepContent());
        }
    }

}
