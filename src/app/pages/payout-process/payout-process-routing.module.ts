import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayoutProcessPage } from './payout-process.page';

const routes: Routes = [
  {
    path: '',
    component: PayoutProcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayoutProcessPageRoutingModule {}
