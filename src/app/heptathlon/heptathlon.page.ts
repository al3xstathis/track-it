import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeptathlonClass} from "../../models/heptathlon.class";
import {AlertController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from "firebase/app"
import "firebase/database";
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'app-heptathlon',
  templateUrl: './heptathlon.page.html',
  styleUrls: ['./heptathlon.page.scss'],
})
export class HeptathlonPage implements OnInit, OnDestroy {

  dataIn  = new HeptathlonClass();
  dataOut = new HeptathlonClass();

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

                        for (let key in this.dataIn) {
                            if (this.dataIn.hasOwnProperty(key)) {
                                if (this.dataIn[key] == undefined) {
                                    this.dataIn[key] = "0";
                                }
                            }
                        }

                            const id = (await this.auth.currentUser).uid;

                        //edit
                        if(this.dataIn.id) {
                            await this.db.collection('users').doc(id).collection('saved').doc(this.dataIn.id).set({
                                time: firebase.database.ServerValue.TIMESTAMP,
                                title: data.event,
                                two: this.dataIn.two,
                                lj: this.dataIn.lj,
                                sp: this.dataIn.sp,
                                hj: this.dataIn.hj,
                                hurdles: this.dataIn.hurdles,
                                jt: this.dataIn.jt,
                                eight: this.dataIn.eight,
                                dayOne: this.dataOut.dayOneScore,
                                dayTwo: this.dataOut.dayTwoScore,
                                total: this.dataOut.totalScore,
                                type: "fHep"
                            })
                                .catch(error => {
                                    console.log(error);
                                })
                            await this.presentToast()
                        }
                            else {
                                //add new event
                            await this.db.collection('users').doc(id).collection('saved').add({
                                time: firebase.database.ServerValue.TIMESTAMP,
                                title: data.event,
                                two: this.dataIn.two,
                                lj: this.dataIn.lj,
                                sp: this.dataIn.sp,
                                hj: this.dataIn.hj,
                                hurdles: this.dataIn.hurdles,
                                jt: this.dataIn.jt,
                                eight: this.dataIn.eight,
                                dayOne: this.dataOut.dayOneScore,
                                dayTwo: this.dataOut.dayTwoScore,
                                total: this.dataOut.totalScore,
                                type: "fHep"
                            })
                                .catch(error => {
                                    console.log(error);
                                })
                            await this.presentToast()
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    updateScore(){
      for (let key in this.dataIn) {
          if (this.dataIn.hasOwnProperty(key)) {
              if (key != "eight") {
                  let parse = Number(this.dataIn[key]);
                  if (parse != 0.00) {
                      let eventScore = this.dataIn.eventScore(key, parse);
                      if (isNaN(eventScore)) {
                          eventScore = 0;
                      }
                      this.dataOut[key] = eventScore;
                  } else {
                      this.dataOut[key] = 0;
                  }
              } else {
                  if (this.dataIn[key] != "" && this.dataIn[key] != "0.00") {
                      let eventScore = this.dataIn.eventScore(key, this.dataIn[key])
                      if (isNaN(eventScore)) {
                          eventScore = 0;
                      }
                      this.dataOut[key] = eventScore.toString();
                  } else {
                      this.dataOut[key] = "0";
                  }
              }
          }
      }
      this.calculateDayOne();
      this.calculateDayTwo();
      this.calculateTotal();
  }

    private isDayOne(value: string) {
        return (value == "hurdles" || value == "hj" || value == "sp" || value == "two");
    }

    private isDayTwo(value: string) {
        return (value == "lj" || value == "jt" || value == "eight");
    }

    calculateDayOne(){
      let dayOneScore=0;
      for(let key in this.dataIn){
          if (this.dataIn.hasOwnProperty(key)){
              if(this.isDayOne(key)){
                  dayOneScore+=Number(this.dataOut[key]);
              }
          }
      }
      this.dataOut.dayOneScore=dayOneScore.toString();
    }

    calculateDayTwo(){
      let dayTwoScore=0;
      for(let key in this.dataIn){
          if (this.dataIn.hasOwnProperty(key)){
              if(this.isDayTwo(key)){
                  dayTwoScore+=Number(this.dataOut[key]);
              }
          }
      }
      this.dataOut.dayTwoScore=dayTwoScore.toString();
    }

    calculateTotal() {
        this.dataOut.totalScore = (Number(this.dataOut.dayOneScore) + Number(this.dataOut.dayTwoScore)).toString();
    }

    async save() {
        for (let key in this.dataIn) {
            if (this.dataIn.hasOwnProperty(key)) {
                if (this.dataIn[key] == undefined) {
                    this.dataIn[key] = "0";
                }
            }
        }
        const id = (await this.auth.currentUser).uid;
        //edit
            await this.db.collection('users').doc(id).collection('saved').doc(this.dataIn.id).set({
                time: firebase.database.ServerValue.TIMESTAMP,
                title: this.dataIn.title,
                two: this.dataIn.two,
                lj: this.dataIn.lj,
                sp: this.dataIn.sp,
                hj: this.dataIn.hj,
                hurdles: this.dataIn.hurdles,
                jt: this.dataIn.jt,
                eight: this.dataIn.eight,
                dayOne: this.dataOut.dayOneScore,
                dayTwo: this.dataOut.dayTwoScore,
                total: this.dataOut.totalScore,
                type: "fHep"
            })
                .catch(error => {
                    console.log(error);
                })
        await this.clearAll();
        await this.router.navigateByUrl('saved');
        await this.presentToast()

    }

    clear() {
        for (let key in this.dataIn) {
            if(this.dataIn.hasOwnProperty(key)) {
                if(key != "id" && key != "title") {
                    this.dataIn[key] = "";
                }
            }
        }
    }

    async clearAll() {
        ContentService.fHepValues = null;
    }

    ngOnDestroy() {
        this.clearAll();
    }

    ngOnInit() {
      this.updateScore();
        if(ContentService.fHepValues != null) {
            this.dataIn.hurdles = ContentService.fHepValues.hurdles;
            this.dataIn.lj = ContentService.fHepValues.lj;
            this.dataIn.sp = ContentService.fHepValues.sp;
            this.dataIn.hj = ContentService.fHepValues.hj;
            this.dataIn.two = ContentService.fHepValues.two;
            this.dataIn.jt = ContentService.fHepValues.jt;
            this.dataIn.eight = ContentService.fHepValues.eight;
            this.dataIn.id = ContentService.fHepValues.id;
            this.dataIn.title = ContentService.fHepValues.title;

            //console.log(ContentService.getHepContent());
        }
  }

}
