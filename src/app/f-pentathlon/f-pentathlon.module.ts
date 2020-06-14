import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FPentathlonPageRoutingModule } from './f-pentathlon-routing.module';

import { FPentathlonPage } from './f-pentathlon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FPentathlonPageRoutingModule
  ],
  declarations: [FPentathlonPage]
})
export class FPentathlonPageModule {}
