import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProMessagesPage } from './pro-messages.page';

const routes: Routes = [
  {
    path: '',
    component: ProMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProMessagesPageRoutingModule {}
