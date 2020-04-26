import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

import {subscribeTo} from "rxjs/internal-compatibility";
import {DecathlonClass} from "../../models/decathlon.class";
import {HeptathlonClass} from "../../models/heptathlon.class";
import {Subject} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  public savedEvent = [];
  private dec = new DecathlonClass();
  private hep = new HeptathlonClass();

  constructor(private db: AngularFirestore, private user: AngularFireAuth) {
    this.init();
  }

  async init() {
    const id = (await this.user.currentUser).uid;
    this.db.collection('saved', ref =>
        ref.where('UID', '==', id)).get()
        .subscribe(data => {
          data.forEach(doc => {
            this.savedEvent.push(doc.data());
          });
        });
  }


  ngOnInit() {
  }
}
