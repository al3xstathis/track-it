import { Component, OnInit } from '@angular/core';
import {HeptathlonClass} from "../../models/heptathlon.class";
import {first} from "rxjs/operators";
import {AlertController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-heptathlon',
  templateUrl: './heptathlon.page.html',
  styleUrls: ['./heptathlon.page.scss'],
})
export class HeptathlonPage implements OnInit {

  dataIn  = new HeptathlonClass();
  dataOut = new HeptathlonClass();

  constructor(private alertCtrl: AlertController, private db: AngularFirestore, private auth: AngularFireAuth, private toastController: ToastController) {
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
                    handler: data => {
                        this.auth.authState.pipe(first()).toPromise().then(cred => {
                            this.db.collection('saved').add({
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
                                UID: cred.uid,
                                hep: true
                            })
                        }).catch(error => {
                            console.log(error);
                        })
                        this.presentToast()
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


  ngOnInit() {
  }

}
