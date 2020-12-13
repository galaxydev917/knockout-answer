import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProServiceDetailsPage } from './pro-service-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProServiceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProServiceDetailsPageRoutingModule {}
