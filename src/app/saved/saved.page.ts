import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {NavigationExtras, Router, RouterModule} from "@angular/router";
import {map} from "rxjs/operators";
import {ContentService} from "../../services/content.service";
import {EventInterface} from "../../models/event.interface";
import {Observable} from "rxjs";
import {AlertController} from "@ionic/angular";

export interface EventId extends EventInterface { id: string; }

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  // public savedEvent = [];
  // private dec = new DecathlonClass();
  // private hep = new HeptathlonClass();

    private savedCollection: AngularFirestoreCollection<EventInterface>;
    events:Observable<any>;

  constructor(private db: AngularFirestore,
              private user: AngularFireAuth,
              private router: Router,
              private content: ContentService,
              private alert: AlertController) {
    this.init();
  }

  openSaved1(savedEvent) {

      if(savedEvent.type === 'mDec') {
          let navigationExtras: NavigationExtras = {
              queryParams: {
                  "hundred": savedEvent.hundred,
                  "lj": savedEvent.lj,
                  "sp": savedEvent.sp,
                  "hj": savedEvent.hj,
                  "four": savedEvent.four,
                  "hurdles": savedEvent.hurdles,
                  "dt": savedEvent.dt,
                  "pv": savedEvent.pv,
                  "jt": savedEvent.jt,
                  "fifteen": savedEvent.fifteen,
                  "id": savedEvent.id
              }
          };
          this.router.navigate(["/decathlon"], navigationExtras)
              .then(result => {
                  console.log(result);
              })
              .catch(err => {
                  console.log(err);
              })

          // this.router.navigate(["/decathlon"])
          //     .then(result => {
          //         console.log(result);
          //     })
          //     .catch(err => {
          //         console.log(err);
          //     })

      } else if (savedEvent.type === 'fHep') {

          let navigationExtras: NavigationExtras = {
              queryParams: {
                  "hurdles": savedEvent.hurdles,
                  "lj": savedEvent.lj,
                  "sp": savedEvent.sp,
                  "hj": savedEvent.hj,
                  "two": savedEvent.two,
                  "jt": savedEvent.jt,
                  "eight": savedEvent.eight,
                  "id": savedEvent.id
              }
          };
          this.router.navigate(["/heptathlon"], navigationExtras)
              .then(result => {
                  console.log(result);
              })
              .catch(err => {
                  console.log(err);
              })
      }
      console.log(savedEvent);
  }

  async openAlert(saved) {
      const alert = await this.alert.create({
          header: 'Edit or Delete?',
          cssClass: 'alert',
          buttons: [
              {
                  text: 'Edit',
                  handler: data => {
                      this.openSaved(saved);
                  }
              },
              {
                  text: 'Delete',
                  handler: async data => {
                      const id1 = (await this.user.currentUser).uid;
                      await this.db.collection('users').doc(id1).collection('saved').doc(saved.id).delete();
                  }
              }
          ]
      });
      await alert.present();
  }

  async sort() {
      const alert = await this.alert.create({
          header: 'Sort by:',
          cssClass: 'alert',
          buttons: [
              {
                  text: 'Decathlon Men',
                  handler: async data => {
                      const id = (await this.user.currentUser).uid;

                      this.savedCollection = this.db.collection('users').doc(id).collection<EventInterface>('saved', ref => ref.where('type', '==', 'mDec'));
                      this.events = this.savedCollection.snapshotChanges().pipe(
                          map(actions => actions.map(a => {
                              const data = a.payload.doc.data() as EventInterface;
                              const id = a.payload.doc.id;
                              return { id, ...data };
                          }))
                      )
                  }
              },
              {
                  text: 'Heptathlon Women',
                  handler: async data => {
                      const id = (await this.user.currentUser).uid;

                      this.savedCollection = this.db.collection('users').doc(id).collection<EventInterface>('saved', ref => ref.where('type', '==', 'fHep'));
                      this.events = this.savedCollection.snapshotChanges().pipe(
                          map(actions => actions.map(a => {
                              const data = a.payload.doc.data() as EventInterface;
                              const id = a.payload.doc.id;
                              return { id, ...data };
                          }))
                      )
                  }
              },
              {
                  text: 'Heptathlon Men',
                  handler: async data => {
                      const id = (await this.user.currentUser).uid;

                      this.savedCollection = this.db.collection('users').doc(id).collection<EventInterface>('saved', ref => ref.where('type', '==', 'mHep'));
                      this.events = this.savedCollection.snapshotChanges().pipe(
                          map(actions => actions.map(a => {
                              const data = a.payload.doc.data() as EventInterface;
                              const id = a.payload.doc.id;
                              return { id, ...data };
                          }))
                      )
                  }
              },
              {
                  text: 'Pentathlon Women',
                  handler: async data => {
                      const id = (await this.user.currentUser).uid;

                      this.savedCollection = this.db.collection('users').doc(id).collection<EventInterface>('saved', ref => ref.where('type', '==', 'fPent'));
                      this.events = this.savedCollection.snapshotChanges().pipe(
                          map(actions => actions.map(a => {
                              const data = a.payload.doc.data() as EventInterface;
                              const id = a.payload.doc.id;
                              return { id, ...data };
                          }))
                      )
                  }
              },
              {
                 text: 'All',
                 handler: async data => {
                     await this.init();
                 }
              }
          ]
      });
      await alert.present();
  }

  openSaved(savedEvent) {

      switch(savedEvent.type) {
          case 'mDec':
              ContentService.setDecContent(savedEvent);
              this.router.navigateByUrl('/decathlon');
              break;
          case 'fHep':
              ContentService.setHepContent(savedEvent);
              this.router.navigateByUrl('/heptathlon');
              break;
          case 'mHep':
              ContentService.setMHepContent(savedEvent);
              this.router.navigateByUrl('/m-heptathlon');
              break;
          case 'fPent':
              ContentService.setFPentContent(savedEvent);
              this.router.navigateByUrl('f-pentathlon');
              break;
      }
  }

  async init() {
       const id = (await this.user.currentUser).uid;

          this.savedCollection = this.db.collection('users').doc(id).collection<EventInterface>('saved');
          this.events = this.savedCollection.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                  const data = a.payload.doc.data() as EventInterface;
                  const id = a.payload.doc.id;
                  return { id, ...data };
              }))
          )
      //console.log(this.events);
  }


  ngOnInit() {
  }
}
