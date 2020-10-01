import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecathlonPageRoutingModule } from './decathlon-routing.module';

import { DecathlonPage } from './decathlon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecathlonPageRoutingModule
  ],
  declarations: [DecathlonPage]
})
export class DecathlonPageModule {}
