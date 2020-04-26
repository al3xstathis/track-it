import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeptathlonPage } from './heptathlon.page';

const routes: Routes = [
  {
    path: '',
    component: HeptathlonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeptathlonPageRoutingModule {}
