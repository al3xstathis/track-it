import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunwaysPageRoutingModule } from './runways-routing.module';

import { RunwaysPage } from './runways.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunwaysPageRoutingModule
  ],
  declarations: [RunwaysPage]
})
export class RunwaysPageModule {}
