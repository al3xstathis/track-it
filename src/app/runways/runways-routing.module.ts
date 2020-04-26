import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunwaysPage } from './runways.page';

const routes: Routes = [
  {
    path: '',
    component: RunwaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunwaysPageRoutingModule {}
