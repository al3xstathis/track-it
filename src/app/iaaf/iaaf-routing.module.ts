import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IaafPage } from './iaaf.page';

const routes: Routes = [
  {
    path: '',
    component: IaafPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IaafPageRoutingModule {}
