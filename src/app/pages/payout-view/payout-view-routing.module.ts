import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayoutViewPage } from './payout-view.page';

const routes: Routes = [
  {
    path: '',
    component: PayoutViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayoutViewPageRoutingModule {}
