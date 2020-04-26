import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeptathlonPageRoutingModule } from './heptathlon-routing.module';

import { HeptathlonPage } from './heptathlon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeptathlonPageRoutingModule
  ],
  declarations: [HeptathlonPage]
})
export class HeptathlonPageModule {}
