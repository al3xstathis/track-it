import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
    runways: Observable<any>;

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
                    this.presentAlert('longJump', 'Long Jump');
                }
            }, {
                text: 'High Jump',
                handler: () => {
                    this.presentAlert('highJump', 'High Jump');
                }
            }, {
                text: 'Pole vault',
                handler: () => {
                    this.presentAlert('poleVault', 'Pole Vault');
                }
            }, {

                text: 'Triple Jump',
                handler: () => {
                    this.presentAlert('tripleJump', 'Triple Jump');
                }
            }, {
                text: 'Javelin',
                handler: () => {
                    this.presentAlert('javelin', 'Javelin');
                }
            }, {
                text: 'Blocks',
                handler: () => {
                    this.presentAlert('blocks', 'Blocks');
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

    async presentAlert(event: string, eventFull: string) {

        const alert = await this.alert.create({
            header: 'Save ' + eventFull + ' runway',
            cssClass: 'alert',
            inputs: [
                {
                    name: 'runway',
                    placeholder: 'Input runway:'
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
                            event: eventFull,
                            runway: data.runway,
                        }).catch(error => {
                            console.log(error);
                        });
                        // await this.refresh(event);
                        await this.presentToast();
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
                // tslint:disable-next-line:no-shadowed-variable
                const data = a.payload.doc.data() as RunwayInterface;
                // tslint:disable-next-line:no-shadowed-variable
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    // TODO implement edit and delete for block runway

    async edit(title: string, event: string, runway: string, steps: string, id: string) {

        const alert = await this.alert.create({
            header: 'Edit ' + event + ' runway',
            cssClass: 'alert',
            inputs: [
                {
                    name: 'runway',
                    placeholder: 'Input runway:',
                    value: runway
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
                            title,
                            event,
                            runway: data.runway
                        }).catch(error => {
                            console.log(error);
                        });
                        // await this.refresh(event);
                        await this.presentToast();
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
                    text: 'Long Jump',
                    handler: async data => {
                        const id = (await this.user.currentUser).uid;

                        this.runwaysCollection = this.db.collection('users').doc(id)
                            .collection<RunwayInterface>('runways', ref => ref.where('title', '==', 'longJump'));
                        this.runways = this.runwaysCollection.snapshotChanges().pipe(
                            map(actions => {
                                return actions.map(a => {
                                    // tslint:disable-next-line:no-shadowed-variable
                                    const data = a.payload.doc.data() as RunwayInterface;
                                    // tslint:disable-next-line:no-shadowed-variable
                                    const id = a.payload.doc.id;
                                    return {id, ...data};
                                });
                            })
                        );
                    }
                },
                {
                    text: 'High Jump',
                    handler: async data => {
                        const id = (await this.user.currentUser).uid;

                        this.runwaysCollection = this.db.collection('users').doc(id)
                            .collection<RunwayInterface>('runways', ref => ref.where('title', '==', 'highJump'));
                        this.runways = this.runwaysCollection.snapshotChanges().pipe(
                            map(actions => actions.map(a => {
                                // tslint:disable-next-line:no-shadowed-variable
                                const data = a.payload.doc.data() as RunwayInterface;
                                // tslint:disable-next-line:no-shadowed-variable
                                const id = a.payload.doc.id;
                                return {id, ...data};
                            }))
                        );
                    }
                },
                {
                    text: 'Triple Jump',
                    handler: async data => {
                        const id = (await this.user.currentUser).uid;

                        this.runwaysCollection = this.db.collection('users').doc(id)
                            .collection<RunwayInterface>('runways', ref => ref.where('title', '==', 'tripleJump'));
                        this.runways = this.runwaysCollection.snapshotChanges().pipe(
                            map(actions => actions.map(a => {
                                // tslint:disable-next-line:no-shadowed-variable
                                const data = a.payload.doc.data() as RunwayInterface;
                                // tslint:disable-next-line:no-shadowed-variable
                                const id = a.payload.doc.id;
                                return {id, ...data};
                            }))
                        );
                    }
                },
                {
                    text: 'Pole Vault',
                    handler: async data => {
                        const id = (await this.user.currentUser).uid;

                        this.runwaysCollection = this.db.collection('users').doc(id)
                            .collection<RunwayInterface>('runways', ref => ref.where('title', '==', 'poleVault'));
                        this.runways = this.runwaysCollection.snapshotChanges().pipe(
                            map(actions => actions.map(a => {
                                // tslint:disable-next-line:no-shadowed-variable
                                const data = a.payload.doc.data() as RunwayInterface;
                                // tslint:disable-next-line:no-shadowed-variable
                                const id = a.payload.doc.id;
                                return {id, ...data};
                            }))
                        );
                    }
                },
                {
                    text: 'Javelin',
                    handler: async data => {
                        const id = (await this.user.currentUser).uid;

                        this.runwaysCollection = this.db.collection('users').doc(id)
                            .collection<RunwayInterface>('runways', ref => ref.where('title', '==', 'javelin'));
                        this.runways = this.runwaysCollection.snapshotChanges().pipe(
                            map(actions => actions.map(a => {
                                // tslint:disable-next-line:no-shadowed-variable
                                const data = a.payload.doc.data() as RunwayInterface;
                                // tslint:disable-next-line:no-shadowed-variable
                                const id = a.payload.doc.id;
                                return {id, ...data};
                            }))
                        );
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

    ngOnInit() {
    }

}
