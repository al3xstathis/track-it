import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FPentathlonPage } from './f-pentathlon.page';

const routes: Routes = [
  {
    path: '',
    component: FPentathlonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FPentathlonPageRoutingModule {}
