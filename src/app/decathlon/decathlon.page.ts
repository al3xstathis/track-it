import { Component, OnInit } from '@angular/core';
import {DecathlonClass} from "../../models/decathlon.class";
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {AlertController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-decathlon',
  templateUrl: './decathlon.page.html',
  styleUrls: ['./decathlon.page.scss'],
})
export class DecathlonPage implements OnInit {
  dataIn  = new DecathlonClass();
  dataOut = new DecathlonClass();




  constructor(private alertCtrl: AlertController, private db: AngularFirestore, private auth: AngularFireAuth, private toastController: ToastController) {

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
                        UID: cred.uid,
                        dec: true
                })
                }).catch(error => {
                    console.log(error);
                });
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
              if (key != "fifteen") {
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
      this.calculateTotal()
  }

    private isDayOne(value: string) {
        return (value == "hundred" || value == "lj" || value == "sp" || value == "hj" || value == "four" );
    }

    private isDayTwo(value: string) {
        return (value == "hurdles" || value == "dt" || value == "pv" || value == "jt" || value == "fifteen" );
    }

    calculateDayOne(){
      let dayOneScore=0;
      for(let key in this.dataIn){
          if (this.dataIn.hasOwnProperty(key)){
              if(this.isDayOne(key)){
                  dayOneScore+=this.dataOut[key];
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
                  dayTwoScore+=this.dataOut[key];
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
