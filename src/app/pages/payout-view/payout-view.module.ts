import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayoutViewPageRoutingModule } from './payout-view-routing.module';

import { PayoutViewPage } from './payout-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayoutViewPageRoutingModule
  ],
  declarations: [PayoutViewPage]
})
export class PayoutViewPageModule {}
