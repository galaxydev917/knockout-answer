import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceReviewPage } from './service-review.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceReviewPageRoutingModule {}
