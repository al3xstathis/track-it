import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MHeptathlonPage } from './m-heptathlon.page';

const routes: Routes = [
  {
    path: '',
    component: MHeptathlonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MHeptathlonPageRoutingModule {}
