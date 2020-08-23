import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IaafPageRoutingModule } from './iaaf-routing.module';

import { IaafPage } from './iaaf.page';
import {HttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IaafPageRoutingModule
  ],
  declarations: [IaafPage],
  providers: [
      HttpClient
  ]
})
export class IaafPageModule {}
