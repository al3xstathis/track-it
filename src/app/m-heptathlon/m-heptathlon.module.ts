import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MHeptathlonPageRoutingModule } from './m-heptathlon-routing.module';

import { MHeptathlonPage } from './m-heptathlon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MHeptathlonPageRoutingModule
  ],
  declarations: [MHeptathlonPage]
})
export class MHeptathlonPageModule {}
