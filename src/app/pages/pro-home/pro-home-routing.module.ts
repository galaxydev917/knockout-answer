import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProHomePage } from './pro-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProHomePageRoutingModule {}
