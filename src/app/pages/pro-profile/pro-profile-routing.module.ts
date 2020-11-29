import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProProfilePage } from './pro-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProProfilePageRoutingModule {}
